/*
  Warnings:

  - You are about to drop the column `userId` on the `log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_userId_fkey";

-- AlterTable
ALTER TABLE "log" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
