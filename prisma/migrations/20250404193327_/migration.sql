/*
  Warnings:

  - You are about to drop the column `image` on the `homePage` table. All the data in the column will be lost.
  - Added the required column `imageAbout` to the `homePage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageTitle` to the `homePage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTitle` to the `homePage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textAbout` to the `homePage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAbout` to the `homePage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "homePage" DROP COLUMN "image",
ADD COLUMN     "imageAbout" VARCHAR NOT NULL,
ADD COLUMN     "imageTitle" VARCHAR NOT NULL,
ADD COLUMN     "subTitle" VARCHAR(300) NOT NULL,
ADD COLUMN     "textAbout" VARCHAR(400) NOT NULL,
ADD COLUMN     "titleAbout" VARCHAR(255) NOT NULL,
ALTER COLUMN "desctiption" SET NOT NULL,
ALTER COLUMN "desctiption" SET DATA TYPE VARCHAR;

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(400) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "adress" VARCHAR(255) NOT NULL,
    "payMetods" JSONB[],
    "apiKeyPay" VARCHAR(300) NOT NULL,
    "idMarket" VARCHAR(200) NOT NULL,
    "urlSuccessPay" VARCHAR(300) NOT NULL,
    "urlCancelPay" VARCHAR(300) NOT NULL,
    "deliveryMetods" JSONB[],
    "serviceMode" BOOLEAN NOT NULL DEFAULT false,
    "testPayMode" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
