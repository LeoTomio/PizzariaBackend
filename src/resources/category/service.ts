import { Category } from '@prisma/client';
import moment from 'moment';
import prismaClient from "../../prisma";
import { Token } from '../user/interface';
export class CategoryService {
    
    async GetOne(id: string) {
        return await prismaClient.category.findFirst({
            select: {
                id: true,
                name: true,
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

        if (!name || name.trim() === '') throw { message: "Nome invalido", status: 400 };

        return await prismaClient.category.create({
            data: {
                ...response,
                company_id: token.company_id
            },
            select: {
                id: true,
                name: true
            }
        })
    }

    async Edit(response: Category) {
        const { id, name } = response
        if (!name || name.trim() === '') throw { message: "Nome invalido", status: 400 };
        return await prismaClient.category.update({
            data: {
                name: name,
                updated_at: moment().toDate()
            },
            where: {
                id: id
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
