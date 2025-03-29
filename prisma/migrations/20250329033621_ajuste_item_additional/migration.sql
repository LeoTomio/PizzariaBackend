/*
  Warnings:

  - You are about to drop the column `additional_id` on the `item_additional` table. All the data in the column will be lost.
  - Added the required column `product_additional_id` to the `item_additional` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_additional" DROP CONSTRAINT "item_additional_additional_id_fkey";

-- AlterTable
ALTER TABLE "item_additional" DROP COLUMN "additional_id",
ADD COLUMN     "product_additional_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "item_additional" ADD CONSTRAINT "item_additional_product_additional_id_fkey" FOREIGN KEY ("product_additional_id") REFERENCES "product_additional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
