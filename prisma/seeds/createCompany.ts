import { Weekdays } from "../../src/enumerators/weekdays";
import prismaClient from "../../src/prisma";

async function createCompany() {
    const name = "Padrão"

    const existCompany = await prismaClient.company.findFirst({
        where: { name },
    });
    if (existCompany) {
        throw {
            message: "Empresa já existe",
            status: 409
        }
    }
    const company = await prismaClient.company.create({
        data: {
            name,
            phone: '123456789',
            address: 'Rua Padrão, 123',
            withdrawalTime: '30',
            deliveryTimeFrom: '30',
            deliveryTimeTo: '70',
            url:"hasakisushidelivery",
            banner: 'https://res.cloudinary.com/dbycct9ij/image/upload/v1736904605/sem-foto_tzomjx',
        },
    });

    for (const [key, value] of Object.entries(Weekdays)) {
        await prismaClient.companyWeekDay.create({
            data: {
                company_id: company.id,
                weekday: value,
                workHours: '08:00 - 18:00',
            },
        });
    }

    //Já criar um usuario pra essa empresa também

}

export default createCompany;
