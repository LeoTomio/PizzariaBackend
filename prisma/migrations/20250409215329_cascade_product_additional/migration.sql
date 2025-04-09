-- DropForeignKey
ALTER TABLE "product_additional" DROP CONSTRAINT "product_additional_product_id_fkey";

-- AddForeignKey
ALTER TABLE "product_additional" ADD CONSTRAINT "product_additional_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
