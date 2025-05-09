/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `company_style` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_style_company_id_key" ON "company_style"("company_id");
