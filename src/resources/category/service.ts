import { Category } from '@prisma/client';
import moment from 'moment';
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

        //quando tiver as opções de adicionais, será necessario vincular aq tbm
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
                        unity: true

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
}
