import prismaClient from "../../src/prisma";

async function createWeekDays() {

    const weekdays = [
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
        'domingo',
    ];

    const createdWeekdays = [];
    for (const day of weekdays) {
        const weekday = await prismaClient.weekDays.create({
            data: { name: day },
        });
        createdWeekdays.push(weekday);
    }

}
export default createWeekDays