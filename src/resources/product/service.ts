import prismaClient from "../../prisma";

export class ProductService {

    async GetOne(product_id: string) {
        return await prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        })
    }
}