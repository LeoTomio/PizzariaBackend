import prismaClient from "../../src/prisma";


async function createCompany() {
    // Criar empresa
    const company = await prismaClient.company.create({
        data: {
            name: 'Restaurante Padrão',
            phone: '123456789',
            address: 'Rua Padrão, 123',
            withdrawalTime: '30',
            deliveryTimeFrom: '18:30',
            deliveryTimeTo: '22:00',
            banner: 'https://example.com/banner.jpg',
        },
    });

    // Recuperar os dias da semana
    const weekdays = await prismaClient.weekDays.findMany();

    // Associar dias da semana à empresa
    for (const weekday of weekdays) {
        await prismaClient.companyWeekDay.create({
            data: {
                company_id: company.id,
                weekday_id: weekday.id,
                workHours: '08:00 - 18:00',
            },
        });
    }
    console.log('Empresa e associações criadas!');
}

export default createCompany