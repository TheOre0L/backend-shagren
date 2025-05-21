/*
  Warnings:

  - You are about to drop the `reviewToHomePage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviewToHomePage" DROP CONSTRAINT "reviewToHomePage_homePage_fkey";

-- DropForeignKey
ALTER TABLE "reviewToHomePage" DROP CONSTRAINT "reviewToHomePage_reviewId_fkey";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "relatedProducts" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "isHomePage" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "reviewToHomePage";
