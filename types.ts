import { WeighIn } from "@prisma/client";

export type WeighInsDateDiffed = {
  diff: number;
  previousWeighIn: WeighIn;
};
