import moment from "moment";
import { ApiResponse } from "../../../config/apiReturn";
import prismaClient from "../../../prisma";
import { OrderRequest } from "./interface";

export class OrderService {
    async Remove(id: string) {
        // try {
        //     await prismaClient.order.delete({
        //         where: {
        //             id
        //         }
        //     })
        //     return new ApiResponse('Pedido removido', 200)
        // } catch (error) {
        //     console.log(error)
        //     return error
        // }
    }

    async Create(orderData: OrderRequest) {
        // try {
        //     return await prismaClient.order.create({
        //         data: {
        //             table: orderData.table,
        //             name: orderData.name,
        //             company_id:orderData.company_id
        //         }
        //     })

        //     // return new ApiResponse('Pedido adicionado', 200)
        // } catch (error) {
        //     console.log(error)
        //     return error
        // }
    }

    async Send(order_id: string) {
        // try {
        //     await prismaClient.order.update({
        //         data: {
        //             draft: false,
        //         },
        //         where: {
        //             id: order_id
        //         }
        //     })
        //     return new ApiResponse('Pedido enviado', 200)
        // } catch (error) {
        //     console.log(error)
        //     return error
        // }
    }

    async List(url: string) {
        const orders = await prismaClient.order.findMany({
            select: {
                id: true,
                number: true
            },
            where: {
                company: {
                    url: url
                },
                status: {
                    notIn: ["DELIVERING","FINISHED"]


                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        return orders
    }

    async GetOne(url: string, id: string) {
        return await prismaClient.$transaction(async (prisma) => {
            return await prisma.order.findFirst({
                select: {
                    name: true,
                    number: true,
                    phone: true,
                    orderType: true,
                    paymentMethod: true,
                    transshipment: true,
                    total: true,
                    created_at: true,
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



    async Finish(order_id: string) {
        //     try {
        //         await prismaClient.order.update({
        //             data: {
        //                 status: true
        //             },
        //             where: {
        //                 id: order_id
        //             }
        //         })
        //         return new ApiResponse('Pedido finalizado', 200)
        //     } catch (error) {
        //         console.log(error)
        //         return error
        //     }
    }
}