import prismaClient from "../../prisma";
import { LogInput } from "./interface";

export class LogService {
    async LogRegister(data: LogInput) {
        const { url, ...rest } = data;
        const company = await prismaClient.company.findUnique({
            select: { id: true },
            where: { url: url },
        });

        if (!company) {
            throw new Error('Empresa não encontrada');
        }

        if (data.metadata) {
            data.metadata = JSON.stringify(data.metadata)
        }

        return await prismaClient.log.create({
            data: {
                ...rest,
                company_id: company.id
            },
        });
    }

}


