/*
  Warnings:

  - Added the required column `materialid` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "materialid" UUID NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "oldPrice" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Material" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_materialid_fkey" FOREIGN KEY ("materialid") REFERENCES "Material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
