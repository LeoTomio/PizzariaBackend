import { Category } from '@prisma/client';
import moment from 'moment';
import prismaClient from "../../../prisma";
import { Token } from '../../user/interface';

export class CategoryService {

    async GetOne(id: string, token: Token) {
        return await prismaClient.category.findFirst({
            select: {
                id: true,
                name: true,
                company_id: true
            },
            where: {
                id: id,
                ...(token.type != "ADMIN" && { company_id: token.company_id })
            }
        })
    }

    async List(company_id: string, token: Token) {
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
                company: token.type === "ADMIN" ? { select: { name: true } } : false,
                ...(token.type === "ADMIN" && { company_id: true })
            },
            where: {
                company_id: company_id
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
                company_id: response.company_id || token.company_id
            },
            select: {
                id: true,
                name: true,
                company: token.type === "ADMIN" ? { select: { name: true } } : false,
            }
        }).then((createdCategory) => {
            if (createdCategory.company) {
                return {
                    ...createdCategory,
                    company: createdCategory.company.name,
                };
            }
            return createdCategory;
        })
    }

    async Edit(response: Category, token: Token) {
        const { id, name } = response;
        if (!name || name.trim() === '') throw { message: "Nome inválido", status: 400 };

        const existingCategory = await this.GetOne(id, token);
        console.log(existingCategory)
        if (!existingCategory) throw { message: "Categoria não encontrada", status: 404 };

        if (token.type !== "ADMIN" && existingCategory.company_id !== token.company_id) {
            throw { message: "Não autorizado a editar esta categoria", status: 403 };
        }

        return await prismaClient.category.update({
            data: {
                name: name,
                updated_at: moment().toDate(),
            },
            select: {
                id: true,
                name: true,
                company_id: true,
                company: token.type === "ADMIN" ? { select: { name: true } } : false,
            },
            where: {
                id: id,
            },
        }).then((editedCategory) => {
            if (editedCategory.company) {
                return {
                    ...editedCategory,
                    company: editedCategory.company.name,
                };
            }
            return editedCategory;
        });
    }

    async Delete(id: Category['id'], token: Token) {

        const existingCategory = await this.GetOne(id, token);
        if (!existingCategory) throw { message: "Categoria não encontrada", status: 404 };

        let haveProduct = !!await prismaClient.product.findFirst({
            where: {
                category_id: id
            },
        });
        if (haveProduct) throw { message: "Não é possível deletar, pois existem produtos cadastrados nesta categoria", status: 409 };

        if (token.type !== "ADMIN") {
            const category = await prismaClient.category.findUnique({
                where: { id: id },
                select: { company_id: true }
            });

            if (category?.company_id !== token.company_id) {
                throw { message: "Não autorizado a excluir esta categoria", status: 403 };
            }
        }

        await prismaClient.category.delete({
            where: { id: id }
        });
    }
}
