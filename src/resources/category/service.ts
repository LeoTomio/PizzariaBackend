import { Category } from '@prisma/client';
import moment from 'moment';
import prismaClient from "../../prisma";
import { Token } from '../user/interface';
import { isAdm } from '../../utils/tokenDecodify';
export class CategoryService {

    async GetOne(id: string) {
        return await prismaClient.category.findFirst({
            select: {
                id: true,
                name: true,
                company_id: true
            },
            where: {
                id: id
            }
        })
    }

    async List(token: Token) {
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
                company: !token.company_id ? { select: { name: true } } : false,
                company_id: true
            },
            where: {
                company_id: token.company_id || undefined,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return categories.map((category) => {
            if (category.company) {
                return {
                    ...category,
                    company: category.company.name,
                };
            }
            return category;
        });
    }

    async Create(response: Category, token: Token) {
        const { name } = response

        if (!name || name.trim() === '') throw { message: "Nome inválido", status: 400 };

        return await prismaClient.category.create({
            data: {
                ...response,
                company_id: token.company_id || response.company_id
            },
            select: {
                id: true,
                name: true,
                company: {
                    select: {
                        name: true
                    }
                }
            }
        }).then((createdCategory) => {
            return {
                id: createdCategory.id,
                name: createdCategory.name,
                company: createdCategory.company.name
            }
        })
    }


    async Edit(response: Category, token: Token) {
        const { id, name, company_id } = response
        if (!name || name.trim() === '') throw { message: "Nome invalido", status: 400 };
        const existingCategory = await this.GetOne(id)

        if (!existingCategory) throw { message: "Categoria não encontrada", status: 404 };
        const updatedCompanyId = isAdm(token) ? company_id : existingCategory.company_id;
        console.log(updatedCompanyId)

        return await prismaClient.category.update({
            data: {
                name: name,
                company_id: company_id,
                updated_at: moment().toDate()
            },
            select: {
                id: true,
                name: true,
                company_id: true,
                company: {
                    select: {
                        name: true
                    }
                },
            },
            where: {
                id: id
            }
        }).then((createdCategory) => {
            return {
                id: createdCategory.id,
                name: createdCategory.name,
                company: createdCategory.company.name
            }
        })
    }

    async Delete(id: Category['id']) {
        let haveProduct = !!await prismaClient.product.findFirst({
            where: {
                category_id: id
            },
        })
        if (haveProduct) throw { message: "Não é possível deletar, pois existem produtos cadastrados nesta categoria", status: 409 };

        await prismaClient.category.delete({
            where: {
                id: id
            }
        })
    }
}
