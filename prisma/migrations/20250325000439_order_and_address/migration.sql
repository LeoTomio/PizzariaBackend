/*
  Warnings:

  - You are about to drop the column `draft` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `table` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cpf` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderType` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('RECEIVED', 'PREPARING', 'DELIVERING', 'FINISHED');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('retirada', 'entrega');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('pix', 'money', 'card');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "draft",
DROP COLUMN "table",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "orderType" "OrderType" NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "transshipment" DECIMAL(8,2),
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'RECEIVED',
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,
    "referencePoint" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);
