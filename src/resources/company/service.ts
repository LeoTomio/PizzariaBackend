import { Company, Type, User } from '@prisma/client';
import { Weekdays } from '../../enumerators/weekdays';
import prismaClient from "../../prisma";
import { UserService } from '../user/service';
import { CompanyEdit } from './interface';
import { hash } from 'bcryptjs'

export class CompanyService {

    async GetOne(id: string) {
        return await prismaClient.company.findFirst({
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                withdrawalTime: true,
                deliveryTimeFrom: true,
                deliveryTimeTo: true,
                banner: true,
                facebook: true,
                instagram: true,
                weekDays: {
                    select: {
                        weekday: true,
                        workHours: true,
                    },
                    orderBy: {
                        id: 'asc'
                    }
                },
                User: {
                    select: {
                        email: true
                    }
                }
            },
            where: {
                id: id,
            },
        });
    }

    async List() {
        return await prismaClient.company.findMany({
            select: {
                id: true,
                name: true,
                isActive: true
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async Create(data: Company & Pick<User, 'email'>) {

        const { email, ...companyData } = data
        if (!companyData.name || companyData.name.trim() === '') {
            throw { message: "Nome inválido", status: 400 };
        }

        await this.FindFirst(companyData.name).then((exist) => {
            if (exist) throw { message: "Empresa já existe", status: 409 };
        });

        return await prismaClient.$transaction(async (prisma) => {
            const company = await prisma.company.create({
                data: {
                    ...companyData,
                },
                select: {
                    id: true,
                    name: true,
                    isActive:true
                }
            }).then(async (company) => {
                await prisma.user.create({
                    data: {
                        email,
                        password: await hash('54321', 8),
                        name: companyData.name,
                        type: Type.RESTAURANT,
                        company_id: company.id
                    }
                })
                return company
            });
            const weekdayPromises = Object.entries(Weekdays).map(([key, value]) => {
                return prisma.companyWeekDay.create({
                    data: {
                        company_id: company.id,
                        weekday: value,
                        workHours: '00:00 - 00:00',
                    }
                });
            });
            await Promise.all(weekdayPromises);
            return company;
        })
    }

    async Edit(company: CompanyEdit) {
        const { id, User, weekDays, ...companyData } = company;
        const { email, password } = User

        if (!companyData.name || companyData.name.trim() === '') {
            throw { message: "Nome inválido", status: 400 };
        }

        // Verificar se a empresa já existe
        await this.FindFirst(companyData.name).then((exist) => {
            if (exist && exist.id != id) {
                throw { message: "Empresa já existe", status: 409 };
            }
        });
        var user
        var weekdays
        var updatedCompany
        // Iniciar a transação
        await prismaClient.$transaction(async (prisma) => {

            // Atualizar a empresa
            updatedCompany = await prisma.company.update({
                data: {
                    ...companyData,
                },
                include: {
                    User: {
                        select: {
                            email: true
                        }
                    },
                    weekDays: true
                },
                where: {
                    id: id
                }
            });

            if (email || password) {
                user = await prisma.user.update({
                    data: {
                        ...(email && { email }),
                        ...(password && { password: await hash(password, 8) }),
                        name: companyData.name
                    },
                    select: {
                        email: true
                    },
                    where: {
                        company_id: id
                    }
                });
            }
            if (weekDays && weekDays.length > 0) {
                // Realiza as alterações no banco
                await Promise.all(weekDays.map(async (weekDay) => {
                    const existingWeekDay = await prisma.companyWeekDay.findFirst({
                        where: {
                            company_id: id,
                            weekday: weekDay.weekday
                        }
                    });

                    if (existingWeekDay) {
                        if (existingWeekDay.workHours !== weekDay.workHours) {
                            await prisma.companyWeekDay.update({
                                data: {
                                    workHours: weekDay.workHours,
                                },
                                where: {
                                    id: existingWeekDay.id,
                                },
                            });
                        }
                    } else {
                        await prisma.companyWeekDay.create({
                            data: {
                                company_id: id,
                                weekday: weekDay.weekday,
                                workHours: weekDay.workHours,
                            }
                        });
                    }
                }));

                weekdays = await prisma.companyWeekDay.findMany({
                    where: { company_id: id },
                    orderBy: {
                        id: 'asc',
                    }
                });
            }
        });
        const result = {
            ...updatedCompany,
            User: { ...user },
            weekDays: weekdays
        }

        return result;
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

    async getSocialMedia(id: string) {
        return await prismaClient.company.findFirst({
            select: {
                instagram: true,
                facebook: true
            },
            where: {
                id
            }
        });
    }
}
