-- AlterTable
ALTER TABLE "Color" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
