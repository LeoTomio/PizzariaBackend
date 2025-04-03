import { Additional, ProductAdditional } from '@prisma/client';
import prismaClient from "../../../../prisma";

export class ProductAdditionalService {

    async GetList(product_id: string) {
        if (!product_id) {
            throw {
                message: "ID é obrigatório",
                status: 400
            };
        }
        let additionalList = await prismaClient.productAdditional.findMany({
            select: {
                id: true,
                price: true,
                additional: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            where: {
                product_id: product_id
            }
        })

        return additionalList.map((item) => {
            const { additional, ...rest } = item
            return {
                ...rest,
                additional_id: additional.id,
                name: additional.name
            }
        })
    }


    async Create(productAdditionalCreate: ProductAdditional) {
        const exist = !!await prismaClient.productAdditional.findFirst({
            where: {
                additional_id: productAdditionalCreate.additional_id,
                product_id: productAdditionalCreate.product_id
            }
        })
        if (exist) {
            throw {
                message: "Adicional já existe",
                status: 409
            }
        }

        return await prismaClient.productAdditional.create({
            select: {
                additional: {
                    select: { name: true },
                },
                id: true,
                price: true,
            },
            data: {
                additional_id: productAdditionalCreate.additional_id,
                product_id: productAdditionalCreate.product_id,
                price: productAdditionalCreate.price
            }
        }).then((item) => {
            const { additional, ...rest } = item
            return {
                ...rest,
                name: additional.name
            }
        })
    }

    async Edit(id: string, price: string) {
        const exist = !!await prismaClient.productAdditional.findFirst({
            where: {
                id: id
            }
        })
        if (!exist) {
            throw {
                message: "Adicional não existe",
                status: 404
            }
        }
        return await prismaClient.productAdditional.update({
            data: {
                price: price
            },
            where: {
                id: id
            }
        })
    }

    async Delete(id: ProductAdditional['id']) {
        return await prismaClient.productAdditional.delete({ where: { id } })
    }
}