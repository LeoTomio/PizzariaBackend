/*
  Warnings:

  - You are about to alter the column `value` on the `cupom` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `price` on the `product_additional` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.

*/
-- AlterTable
ALTER TABLE "cupom" ALTER COLUMN "value" SET DATA TYPE DECIMAL(8,2);

-- AlterTable
ALTER TABLE "product_additional" ALTER COLUMN "price" SET DATA TYPE DECIMAL(8,2);
