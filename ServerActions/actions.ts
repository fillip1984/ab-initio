"use server";

import { zfd } from "zod-form-data";
import { prisma } from "../prisma/globalPrismaClient";
import { redirect } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { WeighInsDateDiffed } from "@/types";

// const schema = zfd.formData({
//   date: zfd.text(), //wish there was support for date, even better would be using the prisma schema
//   weight: zfd.numeric(),
//   bodyFatPercentage: zfd.numeric().optional(),
// });

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
  const allWeighIns = await prisma.weighIn.findMany();

  const weighInDateDiffed: WeighInsDateDiffed[] = allWeighIns
    .map((previous) => {
      return {
        diff: differenceInCalendarDays(weighInDate, previous.date),
        previousWeighIn: previous,
      };
    })
    .sort((a, b) => {
      return a.diff - b.diff;
    });

  const closestPreviousWeighIn = weighInDateDiffed.filter(
    (previousWeighIn) => previousWeighIn.diff > 0
  )[0];

  const firstWeighIn = weighInDateDiffed[weighInDateDiffed.length - 1];

  let goal = 175;
  let weightProgress;
  let weightToGoal;
  let weightTotalChange;
  // let bodyFatProgress;
  // let bodyFatTotalChange;
  // let bodyFatToGoal;
  if (closestPreviousWeighIn) {
    weightProgress = (
      weighInWeight - closestPreviousWeighIn.previousWeighIn.weight.toNumber()
    ).toFixed(2);

    weightTotalChange = (
      weighInWeight - firstWeighIn.previousWeighIn.weight.toNumber()
    ).toFixed(2);

    weightToGoal = (weighInWeight - goal).toFixed(2);
  } else if (allWeighIns.length === 0) {
    //first time weighing in
    weightProgress = 0;
    weightTotalChange = 0;
    weightToGoal = Math.round((weighInWeight - goal) * 100) / 100;
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
