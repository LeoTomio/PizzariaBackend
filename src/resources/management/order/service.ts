import moment from "moment";
import prismaClient from "../../../prisma";
import { OrderStatus } from "@prisma/client";

export class OrderService {
 
    async List(url: string) {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Começo do dia
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Fim do dia

        const orders = await prismaClient.order.findMany({
            select: {
                id: true,
                number: true,
                status: true
            },
            where: {
                company: {
                    url: url
                },
                created_at: {
                    gte: startOfDay,
                    lte: endOfDay,
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return orders;
    }

    async GetOne(url: string, id: string) {
        return await prismaClient.$transaction(async (prisma) => {
            return await prisma.order.findFirst({
                select: {
                    id: true,
                    name: true,
                    number: true,
                    phone: true,
                    orderType: true,
                    paymentMethod: true,
                    transshipment: true,
                    total: true,
                    created_at: true,
                    status: true,
                    items: {
                        select: {
                            quantity: true,
                            observation: true,
                            product: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            },
                            ItemAdditional: {
                                select: {
                                    quantity: true,
                                    additional: {
                                        select: {
                                            name: true,
                                            ProductAdditional: {
                                                select: {
                                                    price: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                where: {
                    id,
                    company: {
                        url
                    }
                }
            }).then((order) => {
                const { items, created_at, ...restOrder } = order;
                const formattedItems = items.map((item) => {
                    const { ItemAdditional, product, ...restItem } = item;

                    const additionals = ItemAdditional.map((additional) => ({
                        name: additional.additional.name,
                        quantity: additional.quantity,
                        price: parseFloat(String(additional.additional.ProductAdditional[0].price).replace(",", "."))
                    }));

                    return {
                        ...restItem,
                        name: product.name,
                        price: parseFloat(String(product.price).replace(",", ".")),
                        additionals
                    };
                });

                return {
                    ...restOrder,
                    created_at: moment(created_at).format('HH:mm:ss DD/MM/YYYY'),
                    items: formattedItems
                };
            });
        })
    }

    async ChangeStatus(id: string, status: OrderStatus) {
        return prismaClient.$transaction(async (prisma) => {
            return !!await prisma.order.update({
                data: {
                    status
                },
                where: {
                    id
                }
            })
        })
    }
}