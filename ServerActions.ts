"use server";

import { zfd } from "zod-form-data";
import { prisma } from "./prisma/globalPrismaClient";
import { redirect } from "next/navigation";

const schema = zfd.formData({
  date: zfd.text(), //wish there was support for date, even better would be using the prisma schema
  weight: zfd.numeric(),
  bodyFatPercentage: zfd.numeric(),
});

export const addWeighIn = async (formData: FormData) => {
  // get fields very manual way
  //   const date = formData.get("date");
  //   const weight = formData.get("weight");
  //   const bodyFatPercentage = formData.get("bodyFatPercentage");

  // get fields slightly better but still not as accessible
  //   const { date, weight, bodyFatPercentage } = Object.fromEntries(formData);

  // get fields even better but not every data type supported using a framework
  const { date, weight, bodyFatPercentage } = schema.parse(formData);
  // still have to convert date to Date

  // here's an possible option: https://github.com/colinhacks/zod/discussions/1860

  // here's a method, I couldn't get working, for converting formData to Json, https://ilikekillnerds.com/2017/09/convert-formdata-json-object/

  const result = await prisma.weighIn.create({
    data: {
      date: new Date(date),
      weight,
      bodyFatPercentage,
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
  });
  return weighIns;
};
