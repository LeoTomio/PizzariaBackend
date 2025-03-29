/*
  Warnings:

  - You are about to drop the column `product_additional_id` on the `item_additional` table. All the data in the column will be lost.
  - Added the required column `additional_id` to the `item_additional` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_additional" DROP CONSTRAINT "item_additional_product_additional_id_fkey";

-- AlterTable
ALTER TABLE "item_additional" DROP COLUMN "product_additional_id",
ADD COLUMN     "additional_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "item_additional" ADD CONSTRAINT "item_additional_additional_id_fkey" FOREIGN KEY ("additional_id") REFERENCES "additional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
