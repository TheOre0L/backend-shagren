/*
  Warnings:

  - You are about to drop the column `title` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "homePage" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "desctiption" DROP NOT NULL,
ALTER COLUMN "qrCodes" DROP NOT NULL,
ALTER COLUMN "qrCodes" SET DATA TYPE VARCHAR,
ALTER COLUMN "links" DROP NOT NULL,
ALTER COLUMN "links" SET DATA TYPE VARCHAR,
ALTER COLUMN "imageAbout" DROP NOT NULL,
ALTER COLUMN "imageTitle" DROP NOT NULL,
ALTER COLUMN "subTitle" DROP NOT NULL,
ALTER COLUMN "textAbout" DROP NOT NULL,
ALTER COLUMN "titleAbout" DROP NOT NULL;
