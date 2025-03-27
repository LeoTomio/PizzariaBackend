/*
  Warnings:

  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "observation" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DECIMAL(8,2) NOT NULL;
