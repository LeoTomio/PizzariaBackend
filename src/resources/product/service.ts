import { Product } from '@prisma/client';
import moment from 'moment';
import path from 'path';
import { MulterFunction } from "../../config/multer";
import prismaClient from "../../prisma";

export class ProductService {

    async GetOne(product_id: string) {
        return await prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        })
    }

    async List() {
        return await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                unity: true,
                category: {
                    select: {
                        name: true
                    }
                },
                category_id: true,
                description: true,
                banner: true
            },
            orderBy: {
                name: 'asc'
            }
        })
    }

    async Create(response: Product) {
        return await prismaClient.product.create({
            data: {
                ...response
            }
        })
    }

    async Edit(product: Product) {
        return await prismaClient.product.update({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                banner: product.banner,
                unity: Number(product.unity),
                updated_at: moment().toDate()
            },
            where: {
                id: product.id,
            }
        })
    }

    async Delete(id: Product['id']) {
        let hasOrder = !!await prismaClient.item.findFirst({
            where: {
                product_id: id
            }
        })
        if (hasOrder) {
            throw {
                message: "Não é possivel deletar, pois este item já foi cadastrado em um pedido.",
                status: 409
            };
        }

        const photoName = await prismaClient.product.delete({
            where: {
                id: id,
            },
            select: {
                banner: true
            }
        })
        const caminhoImagem = path.join(__dirname, '..', '..', '..', 'tmp', photoName.banner);
        new MulterFunction().deleteImg(caminhoImagem)
    }
}