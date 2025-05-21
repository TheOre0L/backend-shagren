/*
  Warnings:

  - Made the column `summa` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "summa" SET NOT NULL;
