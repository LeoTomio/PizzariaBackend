import { Additional } from '@prisma/client';
import prismaClient from "../../../prisma";
import moment from 'moment';

export class AdditionalService {

    async GetOne(id: string) {
        if (!id) {
            throw {
                message: "ID é obrigatório",
                status: 400
            };
        }
        return await prismaClient.additional.findUnique({
            select: {
                id: true,
                name: true,
            },
            where: {
                id
            }
        })
    }

    async List() {
        return await prismaClient.additional.findMany({
            select: {
                id: true,
                name: true,
            }
        })
    }

    async Create(additionalCreate: Additional) {
        console.log(additionalCreate)
        const exist = !!await prismaClient.additional.findFirst({
            where: {
                name: additionalCreate.name
            }
        })
        if (exist) {
            throw {
                message: "Adicional já existe",
                status: 409
            }
        }

        return await prismaClient.additional.create({
            data: {
                name: additionalCreate.name
            }
        })
    }

    async Edit(additionalUpdate: Additional) {
        const exist = !!await prismaClient.additional.findFirst({
            where: {
                name: additionalUpdate.name
            }
        })
        if (exist) {
            throw {
                message: "Adicional já existe",
                status: 409
            }
        }
        return await prismaClient.additional.update({
            data: {
                name: additionalUpdate.name,
                updated_at: moment().toDate()
            },
            where: {
                id: additionalUpdate.id
            }
        })
    }

    async Delete(id: Additional['id']) {
        return await prismaClient.additional.delete({ where: { id } })
    }
}