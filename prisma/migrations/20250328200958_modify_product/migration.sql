/*
  Warnings:

  - You are about to drop the column `categoryId` on the `type` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "type" DROP CONSTRAINT "type_categoryId_fkey";

-- AlterTable
ALTER TABLE "type" DROP COLUMN "categoryId",
ADD COLUMN     "categoryid" UUID;

-- AddForeignKey
ALTER TABLE "type" ADD CONSTRAINT "type_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
