-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_deliveryId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_paymentId_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "deliveryId" DROP NOT NULL,
ALTER COLUMN "paymentId" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "summa" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
