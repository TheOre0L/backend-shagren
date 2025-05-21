/*
  Warnings:

  - You are about to drop the column `accordions` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `mark` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `categoryid` on the `type` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `type` table. All the data in the column will be lost.
  - Added the required column `longDescription` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "productId";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "userId";

-- DropForeignKey
ALTER TABLE "type" DROP CONSTRAINT "type_categoryid_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "accordions",
ADD COLUMN     "deliveryInfo" TEXT,
ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "features" JSONB[],
ADD COLUMN     "isBestseller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "oldPrice" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "relatedProducts" JSONB[],
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "thumbnails" JSONB[],
ADD COLUMN     "weight" TEXT;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "mark",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" INTEGER NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "type" DROP COLUMN "categoryid",
DROP COLUMN "title",
ADD COLUMN     "categoryId" UUID,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type" ADD CONSTRAINT "type_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
