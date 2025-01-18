import prismaClient from "../../prisma";

export class ProductService {

    async GetOne(product_id: string) {
        return await prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        })
    }

    async List(company_id: string) {
        return await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                promotional_price: true,
                unity: true,
                category_id: true,
                description: true,
                banner: true
            },
            orderBy: {
                name: 'asc'
            },
            where: {
                category: {
                    company: {
                        id: company_id
                    }
                }
            }
        })
    }
}