import { Company } from '@prisma/client';
import prismaClient from "../../prisma";

export class CompanyService {

    async GetOne(id: string) {
        return await prismaClient.company.findFirst({
            select: {
                name: true,
                phone: true,
                address: true,
                withdrawalTime: true,
                deliveryTimeFrom: true,
                deliveryTimeTo: true,
                banner: true,
                facebook: true,
                instagram: true
            },
            where: {
                id: id
            }
        })
    }

    async List() {
        return await prismaClient.company.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async Create(response: Company) {
        const { name } = response

        if (!name || name.trim() === '') throw { message: "Nome invalido", status: 400 };
        await this.FindFirst(name).then((exist) => {
            if (exist) throw { message: "Empresa já existe", status: 409 };
        })
        return await prismaClient.company.create({
            data: {
                ...response,
            },
            select: {
                id: true,
                name: true
            }
        })
        //Já criar um usuario pra essa empresa também

    }
    async Edit(response: Company) {
        const { id, ...data } = response

        if (!data.name || data.name.trim() === '') throw { message: "Nome invalido", status: 400 };

        await this.FindFirst(data.name).then((exist) => {
            if (exist && exist.id != id) throw { message: "Empresa já existe", status: 409 };
        })

        return await prismaClient.company.update({
            data: {
                ...data
            },
            where: {
                id: id
            }
        })
    }

    async Delete(id: Company['id']) {
        await prismaClient.company.delete({
            where: {
                id
            }
        })
    }

    async FindFirst(name?: string, id?: string) {
        if (name) {
            return await prismaClient.company.findFirst({ where: { name } })
        }
        if (id) {
            return await prismaClient.company.findFirst({ where: { id } })
        }
    }

    async changeStatus(id: string) {
        const company = await this.FindFirst(undefined, id);
        return await prismaClient.company.update({
            data: {
                isActive: !company.isActive
            },
            where: {
                id
            }
        })
    }
}
