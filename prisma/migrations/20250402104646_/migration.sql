/*
  Warnings:

  - The `deliverySum` column on the `delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "delivery" DROP COLUMN "deliverySum",
ADD COLUMN     "deliverySum" INTEGER NOT NULL DEFAULT 0;
