/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `WeighIn` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `weightProgress` to the `WeighIn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightToGoal` to the `WeighIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeighIn" ADD COLUMN     "bodyFatProgress" DECIMAL(65,30),
ADD COLUMN     "bodyFatToGoal" DECIMAL(65,30),
ADD COLUMN     "previousWeighIn" TEXT,
ADD COLUMN     "weightProgress" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "weightToGoal" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WeighIn_date_key" ON "WeighIn"("date");
