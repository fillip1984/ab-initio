"use server";

import { WeighInsDateDiffed } from "@/types";
import { differenceInCalendarDays } from "date-fns";
import { redirect } from "next/navigation";
import { prisma } from "../prisma/globalPrismaClient";

export const addWeighIn = async (formData: FormData) => {
  // get fields, very manual way
  const date = formData.get("date");
  const weight = formData.get("weight");
  const bodyFatPercentage = formData.get("bodyFatPercentage");

  //validate fields
  let weighInDate: Date;
  if (date) {
    weighInDate = new Date(date.toString());
  } else {
    throw Error("Date is required");
  }

  let weighInWeight: number;
  if (weight) {
    weighInWeight = weight.valueOf() as number;
  } else {
    throw Error("Weight is required");
  }

  let weighInBodyFatPercentage: number | null = null;
  if (bodyFatPercentage) {
    weighInBodyFatPercentage = bodyFatPercentage.valueOf() as number;
  }
  //bodyFatPercentage is optional so no error is thrown

  //OTHER METHODS ATTEMPTED TO GET FORM DATA
  // get fields slightly better but still not as accessible
  //   const { date, weight, bodyFatPercentage } = Object.fromEntries(formData);

  // get fields even better but not every data type supported, using a remix forms framework
  // const { date, weight, bodyFatPercentage } = schema.parse(formData);
  // still have to convert date to Date
  // const weighInDate = new Date(date);

  // here's a possible option: https://github.com/colinhacks/zod/discussions/1860

  // here's a method, I couldn't get working, for converting formData to Json, https://ilikekillnerds.com/2017/09/convert-formdata-json-object/

  // get previous weigh in, so we can update progress such as x lbs lost, x lbs to goal

  const firstWeighIn = await getFirstWeighIn();
  const previousWeighIn = await getPreviousWeighIn(weighInDate);

  const goal = await getGoal();
  const goalWeight = goal.weight.toNumber();

  let weightProgress;
  let weightToGoal;
  let weightTotalChange;
  // let bodyFatProgress;
  // let bodyFatTotalChange;
  // let bodyFatToGoal;
  if (firstWeighIn == null) {
    //first time weighing in
    weightProgress = 0;
    weightTotalChange = 0;
    weightToGoal = Math.round((weighInWeight - goalWeight) * 100) / 100;
  } else if (previousWeighIn != null) {
    weightProgress = (
      weighInWeight - previousWeighIn.weight.toNumber()
    ).toFixed(2);

    weightTotalChange = (
      weighInWeight - firstWeighIn.weight.toNumber()
    ).toFixed(2);

    weightToGoal = (weighInWeight - goalWeight).toFixed(2);
  } else {
    throw Error("Cannot find previous weigh In");
  }

  const result = await prisma.weighIn.create({
    data: {
      date: weighInDate,
      weight: weighInWeight,
      weightProgress,
      weightTotalChange,
      weightToGoal,
      // bodyFatPercentage: weighInBodyFatPercentage,
      // bodyFatProgress,
      // bodyFatTotalChange,
    },
  });

  // feels weird to redirect here... maybe split the functionality here to a server action specific to the page and then this action to add weigh ins
  redirect("/weighIns");
};

export const getWeighIns = async () => {
  const weighIns = await prisma.weighIn.findMany({
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      date: true,
      weight: true,
      weightProgress: true,
      weightTotalChange: true,
      weightToGoal: true,
    },
  });

  return weighIns;
};

export const getPreviousWeighIn = async (date: Date) => {
  const allWeighIns = await prisma.weighIn.findMany({
    orderBy: {
      date: "desc",
    },
  });
  const weighInDateDiffed: WeighInsDateDiffed[] = allWeighIns
    .map((previous) => {
      return {
        diff: differenceInCalendarDays(date, previous.date),
        previousWeighIn: previous,
      };
    })
    .sort((a, b) => {
      return a.diff - b.diff;
    });

  return weighInDateDiffed.filter(
    (previousWeighIn) => previousWeighIn.diff > 0
  )[0].previousWeighIn;
};

export const getFirstWeighIn = async () => {
  const firstWeighIn = await prisma.weighIn.findFirst({
    orderBy: {
      date: "asc",
    },
    take: 1,
  });
  return firstWeighIn;
};

export const getGoal = async () => {
  let goal = await prisma.goal.findFirst();

  if (goal === null) {
    // TODO: very presumptuous!
    goal = await prisma.goal.create({
      data: {
        weight: 175,
      },
    });
  }

  return goal;
};

export const updateGoal = async (formData: FormData) => {
  const id = formData.get("id")?.valueOf() as string;
  const weight = formData.get("weight")?.valueOf() as number;

  if (!id) {
    throw Error("Id is required");
  }

  if (!weight) {
    throw Error("Goal weight is required");
  }

  const result = await prisma.goal.update({
    data: {
      weight,
    },
    where: {
      id,
    },
  });

  return result;
};
