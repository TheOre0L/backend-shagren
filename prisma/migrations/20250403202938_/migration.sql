-- AlterTable
ALTER TABLE "review" ADD COLUMN     "images" JSONB[],
ALTER COLUMN "isVerified" SET DEFAULT true;
