/*
  Warnings:

  - Added the required column `weightTotalChange` to the `WeighIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeighIn" ADD COLUMN     "bodyFatTotalChange" DECIMAL(65,30),
ADD COLUMN     "weightTotalChange" DECIMAL(65,30) NOT NULL;
