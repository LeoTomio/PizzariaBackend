import { Category, Product } from '@prisma/client';
import { UploadedFile } from 'express-fileupload';
import moment from 'moment';
import { uploadImage } from '../../../externalServices/cloudinary';
import prismaClient from "../../../prisma";
import { moneyFormater } from '../../../utils/moneyFormat';
import { CategoryService } from '../category/service';
import { Token } from '../user/interface';

export class ProductService {

    async GetOne(product_id: string, token: Token) {
        const product = await prismaClient.product.findFirst({
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
            where: {
                id: product_id,
                ...(token.type != "ADMIN" && {
                    category:
                        { company_id: token.company_id }
                })
            }
        })
        if (!product) throw { message: "Produto não encontrada", status: 404 };
        return product
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
                        category_id: true

                    },
                },
            },
            where: {
                company: {
                    url
                }
            },
        }).then((response) => {
            return response.map(({ created_at, updated_at, company_id, ...rest }) => rest);
        });
    }



    async Create(product: Product & Pick<Category, 'company_id'>, files: any, token: Token) {

        const { name } = product
        const company_id = product.company_id || token.company_id

        if (!files || Object.keys(files).length === 0) {
            throw {
                message: "Erro ao enviar imagem",
                status: 500
            };
        }

        if (!name || name.trim() === '') {
            throw { message: "Nome inválido", status: 400 }
        }
        const categoryService = new CategoryService()

        await categoryService.GetOne(product.category_id, token)

        if (token.type !== "ADMIN") {
            let category = await categoryService.GetOne(product.category_id, token)
            if (category.company_id != company_id) {
                throw { message: "Sem autorização para criar um produto para esta empresa", status: 403 };
            }
        }

        const file = files['file'] as UploadedFile;
        const resultFile = await uploadImage(file);
        product.banner = resultFile.url;

        const prod = await prismaClient.product.create({
            data: {
                name: name,
                banner: product.banner,
                description: product.description,
                category_id: product.category_id,
                price: moneyFormater(product.price),
                promotional_price: product.promotional_price ? moneyFormater(product.promotional_price) : null,
                unity: product.unity
            },
        })
        const { updated_at, created_at, ...rest } = prod

        return prod

    }

    async Edit(product: Product & Pick<Category, 'company_id'>, files: any, token: Token) {
        const company_id = product.company_id || token.company_id
        if (!files && !product.banner) {
            throw {
                message: "Imagem é obrigatória",
                status: 400
            };
        }

        if (files && Object.keys(files).length > 0) {
            const file = files['file'] as UploadedFile;
            const resultFile = await uploadImage(file)
            product.banner = resultFile.url;
        }

        if (!product.name || product.name.trim() === '') {
            throw { message: "Nome inválido", status: 400 }
        }
        const categoryService = new CategoryService()
        await categoryService.GetOne(product.category_id, token)

        if (token.type !== "ADMIN") {
            let category = await categoryService.GetOne(product.category_id, token)
            if (category.company_id !== company_id) {
                throw { message: "Sem autorização para editar este produto", status: 403 };
            }
        }
        return await prismaClient.product.update({
            data: {
                name: product.name,
                description: product.description,
                price: moneyFormater(product.price),
                promotional_price: product.promotional_price ? moneyFormater(product.promotional_price) : null,
                banner: product.banner,
                unity: product.unity,
                updated_at: moment().toDate()
            },
            where: {
                id: product.id,
            }
        })
    }

    async Delete(id: Product['id'], token: Token) {
        const existProduct = await this.GetOne(id, token);
        let hasOrder = !!await prismaClient.item.findFirst({
            where: {
                product_id: id
            }
        })

        if (hasOrder) {
            throw {
                message: "Não é possivel deletar, pois este produto já foi cadastrado em um pedido.",
                status: 409
            };
        }

        if (token.type !== "ADMIN") {
            const categoryService = new CategoryService()
            let category = await categoryService.GetOne(existProduct.category_id, token)
            if (category?.company_id !== token.company_id) {
                throw { message: "Sem autorização para excluir este produto", status: 403 };
            }
        }

        await prismaClient.product.delete({
            where: {
                id: id,
            },
        })
    }
}