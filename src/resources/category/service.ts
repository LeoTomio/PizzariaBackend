import prismaClient from '../../prisma';
export class CategoryService {

    async GetOne(id: string) {
        return await prismaClient.category.findFirst({
            select: {
                id: true,
                name: true,
            },
            where: {
                id,
            },
        });
    }

    async List(url: string) {
        return await prismaClient.category.findMany({
            include: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        banner: true,
                        description: true,
                        promotional_price: true,
                        unity: true,
                        ProductAdditional: {
                            select: {
                                additional_id: true,
                                price: true,
                                additional: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                },
            },
            where: {
                company: {
                    url
                }
            },
        }).then((response) => {
            return response.map(({ created_at, updated_at, company_id, ...rest }) => {
                return {
                    ...rest,
                    products: rest.products.map(({ ProductAdditional, ...product }) => ({
                        ...product,
                        additional: ProductAdditional.map(({ additional_id, price, additional }) => ({
                            id: additional_id,
                            name: additional.name,
                            price
                        }))
                    }))
                };
            });
        });
    }

}
