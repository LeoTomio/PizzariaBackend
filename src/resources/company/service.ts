import moment from 'moment';
import { ApiResponse } from '../../config/apiReturn';
import prismaClient from "../../prisma";
import { Token } from '../user/interface';
import { Company } from '@prisma/client';
import { NextFunction } from 'express';

export class CompanyService {

    async GetOne(id: string) {
        try {
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
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async List() {
        try {
            return await prismaClient.company.findMany({
                select: {
                    name: true,
                },
                orderBy: {
                    name: 'asc',
                },
            });

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async Create(response: Company, next: NextFunction) {
        try {
            const { name } = response
            if (name === '') throw new Error('Nome invalido')

            await this.FindFirst(name).then((exist) => {
                if (exist)
                    if (exist) {
                        const error: any = new Error("Empresa já existe");
                        error.statusCode = 409;
                        throw error;
                    }

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
        } catch (error) {
            next(error)
        }
    }
    async Edit(response: Company, next: NextFunction) {
        try {

            const { id, ...data } = response
            console.log(response)
            if (data.name === '') {
                throw new Error('Nome invalido')
            }
            await this.FindFirst(data.name).then((exist) => {
                if (exist && exist.id != id)
                    if (exist) {
                        const error: any = new Error("Empresa já existe");
                        error.statusCode = 409;
                        throw error;
                    }
            })

            return await prismaClient.company.update({
                data: {
                    ...data
                },
                where: {
                    id: id
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(id: Company['id'], next: NextFunction) {
        try {
            await prismaClient.company.delete({
                where: {
                    id
                }
            })
            return new ApiResponse('Categoria deletada', 200)
        } catch (error) {
            next(error)
        }
    }
    async FindFirst(name?: string, id?: string) {
        if (name) {
            return await prismaClient.company.findFirst({ where: { name } })
        }
        if (id) {
            return await prismaClient.company.findFirst({ where: { id } })
        }

    }

    async Inactive(id: string, next: NextFunction) {
        try {
            const company = await this.FindFirst(undefined, id);
            return await prismaClient.company.update({
                data: {
                    isActive: !company.isActive
                },
                where: {
                    id
                }
            })
        } catch (error) {
            next(error)
        }

    }
}
