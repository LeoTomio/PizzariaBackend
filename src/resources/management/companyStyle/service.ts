import { CompanyStyle } from "@prisma/client";
import prismaClient from "../../../prisma";


export class CompanyStyleService {

    async GetOne(url: string) {
        const company = await prismaClient.company.findFirst({
            select: {
                id: true
            },
            where: {
                url
            }
        })

        if (!company) {
            throw { message: "Empresa não encontrada", status: 404 };
        }

        return await prismaClient.companyStyle.findFirst({
            where: {
                company_id: company.id
            }
        })
    };

    async Create(body: CompanyStyle) {
        return await prismaClient.companyStyle.create({
            data: {
                ...body
            }
        })
    }

    async Edit(body: CompanyStyle) {
        const { company_id, id, ...rest } = body
        return await prismaClient.companyStyle.update({
            data: {
                ...rest
            },
            where: {
                id
            }
        })
    }
}