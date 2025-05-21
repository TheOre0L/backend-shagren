/*
  Warnings:

  - Made the column `name` on table `Settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Шагрень | Магазин кожаных изделий ручной работы',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'Моя маленькая мастерская';
