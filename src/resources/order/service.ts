import prismaClient from "../../prisma";
import { OrderCreate } from "./interface";
import { emitNewOrder } from "./websocket";

export class OrderService {
    async Create(url: string, orderCreate: OrderCreate) {
        return await prismaClient.$transaction(async (prisma) => {
            const company = await prisma.company.findFirst({
                select: { id: true },
                where: { url }
            });

            if (!company) {
                throw new Error('Empresa não encontrada');
            }

            let company_id = company.id;
            let coupon_id
            if (orderCreate.coupon) {
                coupon_id = (await prisma.coupon.findFirst({
                    select: {
                        id: true
                    },
                    where: {
                        code: orderCreate.coupon,
                        company_id: company.id
                    }
                })).id
            }


            let order = await prisma.order.create({
                select: {
                    id: true,
                    number: true,
                    status: true
                },
                data: {
                    coupon_id: coupon_id,
                    name: orderCreate.name,
                    cpf: orderCreate.cpf,
                    orderType: orderCreate.orderType,
                    phone: orderCreate.phone,
                    paymentMethod: orderCreate.paymentMethod,
                    ...(orderCreate.transshipment && { transshipment: orderCreate.transshipment }),
                    company_id: company_id,
                    total: Number(orderCreate.total).toFixed(2)
                }
            });
            let order_id = order.id;
            const { items } = orderCreate;

            await Promise.all(items.map(async (item) => {
                let createdItem = await prisma.item.create({
                    select: { id: true },
                    data: {
                        quantity: item.quantity,
                        product_id: item.id,
                        order_id: order_id,
                        observation: item.observation

                    }
                });

                if (item.additional.length) {
                    const additionalData = item.additional.map((additional) => ({
                        quantity: additional.quantity,
                        additional_id: additional.id,
                        item_id: createdItem.id
                    }));

                    await prisma.itemAdditional.createMany({
                        data: additionalData
                    });
                }
            }));

            emitNewOrder(url, order)

            return { number: order.number }
        });
    }
}
