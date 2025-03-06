/*
  Warnings:

  - You are about to drop the `item_additional_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_additional_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_additionals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_additional_product" DROP CONSTRAINT "item_additional_product_item_id_fkey";

-- DropForeignKey
ALTER TABLE "item_additional_product" DROP CONSTRAINT "item_additional_product_product_additional_id_fkey";

-- DropForeignKey
ALTER TABLE "product_additional_product" DROP CONSTRAINT "product_additional_product_product_additional_id_fkey";

-- DropForeignKey
ALTER TABLE "product_additional_product" DROP CONSTRAINT "product_additional_product_product_id_fkey";

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "item_additional_product";

-- DropTable
DROP TABLE "product_additional_product";

-- DropTable
DROP TABLE "product_additionals";

-- CreateTable
CREATE TABLE "voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additional" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_additional" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "additional_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_additional" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "additional_id" TEXT NOT NULL,
    "item_id" TEXT,

    CONSTRAINT "item_additional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voucher_code_company_id_key" ON "voucher"("code", "company_id");

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_additional" ADD CONSTRAINT "product_additional_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_additional" ADD CONSTRAINT "product_additional_additional_id_fkey" FOREIGN KEY ("additional_id") REFERENCES "additional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_additional" ADD CONSTRAINT "item_additional_additional_id_fkey" FOREIGN KEY ("additional_id") REFERENCES "additional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_additional" ADD CONSTRAINT "item_additional_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
