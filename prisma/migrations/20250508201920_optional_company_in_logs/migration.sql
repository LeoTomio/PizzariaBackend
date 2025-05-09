-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_company_id_fkey";

-- AlterTable
ALTER TABLE "log" ALTER COLUMN "company_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "company_style" (
    "id" TEXT NOT NULL,
    "textColor" TEXT,
    "buttonColor" TEXT,
    "backgroundColor" TEXT,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "company_style_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_style" ADD CONSTRAINT "company_style_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
