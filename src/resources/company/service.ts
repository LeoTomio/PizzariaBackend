import prismaClient from "../../prisma";
export class CompanyService {

    async GetOne(url: string) {
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
                instagram: true,
                isActive: true,
                weekDays: {
                    select: {
                        weekday: true,
                        workHours: true,
                    },
                    orderBy: {
                        id: 'asc'
                    }
                },
            },
            where: {
                url
            },
        });
    }
}
