import { Type } from "@prisma/client";
import prismaClient from "../../prisma";
import { LogInput } from "./interface";


export class LogService {
    async LogRegister(data: LogInput, token: any) {
        try {
            const { url, ...rest } = data;
            // console.log(data)
            let company = null
            if (!token) {
                    throw { message: "Token inválido ou mal formatado", status: 401 };
            }
            if (token.type === 'ADMIN' && data.requestUrl === '/management/company') {
            } else if (token.type === 'ADMIN' && data.url === undefined) {
                throw { message: "Nenhuma empresa selecionada", status: 400 };
            } else {
                company = await prismaClient.company.findUnique({
                    select: { id: true },
                    where: { url: url },
                })

                if (!company) {
                    throw { message: "Empresa não encontrada", status: 404 };
                }
                company = company.id
            }
            if (data.metadata) {
                data.metadata = this.sanitizeMetadata(data.metadata);
            }
            return await prismaClient.log.create({
                data: {
                    ...rest,
                    company_id: company
                },
            });
        } catch (error) {
            return error

        }
    }


    public sanitizeMetadata(metadata: any) {
        const clone = { ...metadata };

        if ('password' in clone.data) {
            clone.data.password = '******';
        }
        return JSON.stringify(clone);
    }
}




