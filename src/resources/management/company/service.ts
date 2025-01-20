import { Company, Type, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { Weekdays } from '../../../enumerators/weekdays';
import prismaClient from "../../../prisma";
import { Token } from '../../user/interface';
import { CompanyEdit } from './interface';
import { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../../../externalServices/cloudinary';

export class CompanyService {

    async GetOne(id: string, token: Token) {
        if (token.company_id && token.company_id != id) {
            throw { message: "Sem autorização para selecionar dados desta empresa", status: 403 };
        }
        const company = await prismaClient.company.findFirst({
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
        if (!company) throw { message: "Empresa não encontrada", status: 404 };
        return company
    }

    async List(token: Token) {
        if (token.type != "ADMIN") {
            throw { message: "Sem autorização para listar empresas", status: 403 };
        }

        return await prismaClient.company.findMany({
            select: {
                id: true,
                name: true,
                isActive: true,
                url: true
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async Create(data: Company & Pick<User, 'email'>, token: Token) {
        if (token.type != "ADMIN") {
            throw { message: "Sem autorização para cadastrar empresa", status: 403 };
        }
        const { email, ...companyData } = data

        if (!companyData.name || companyData.name.trim() === '') {
            throw { message: "Nome inválido", status: 400 };
        }
        await this.FindFirst(companyData.name).then((exist) => {
            if (exist) throw { message: "Empresa já existe", status: 409 };
        });

        companyData.url = companyData.name.replace(/\s+/g, '').toLowerCase();
        companyData.banner = "https://res.cloudinary.com/dbycct9ij/image/upload/v1736904605/sem-foto_tzomjx"


        return await prismaClient.$transaction(async (prisma) => {
            const company = await prisma.company.create({
                data: {
                    ...companyData,
                },
                select: {
                    id: true,
                    name: true,
                    isActive: true
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

    async Edit(company: CompanyEdit, files: any, token: Token) {
        let { id, User, weekDays, ...companyData } = company;
        if (token.company_id && token.company_id != id) {
            throw { message: "Sem autorização para selecionar dados desta empresa", status: 403 };
        }
        let parsedUser = JSON.parse(User as any);
        let parsedWeekDays = JSON.parse(weekDays as any);

        const { email, password } = parsedUser
        if (!files && !companyData.banner) {
            throw new Error("Imagem é obrigatória")
        }
        if (files && Object.keys(files).length > 0) {
            const file = files['file'] as UploadedFile;
            const resultFile = await uploadImage(file)
            companyData.banner = resultFile.url;
        }

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
            if (parsedWeekDays && parsedWeekDays.length > 0) {
                // Realiza as alterações no banco
                await Promise.all(parsedWeekDays.map(async (weekDay) => {
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

    async Delete(id: Company['id'], token: Token) {
        if (token.type != "ADMIN") {
            throw { message: "Sem autorização para deletar empresa", status: 403 };
        }
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

    async changeStatus(id: string, token: Token) {
        if (token.type != "ADMIN") {
            throw { message: "Sem autorização para mudar o status desta empresas", status: 403 };
        }
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
