/*
  Warnings:

  - Added the required column `link` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivery" ADD COLUMN     "deliverySum" TEXT NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "link" VARCHAR NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'send';
