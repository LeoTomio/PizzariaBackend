/*
  Warnings:

  - You are about to drop the column `price` on the `additional` table. All the data in the column will be lost.
  - Added the required column `price` to the `product_additional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "additional" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "product_additional" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
