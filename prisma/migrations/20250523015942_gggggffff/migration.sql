/*
  Warnings:

  - You are about to drop the column `login` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "12";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "login";
