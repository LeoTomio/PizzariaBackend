/*
  Warnings:

  - You are about to drop the column `discount` on the `cupom` table. All the data in the column will be lost.
  - Added the required column `value` to the `cupom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cupom" DROP COLUMN "discount",
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
