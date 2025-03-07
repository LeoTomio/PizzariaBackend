import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createAdditional() {
    const additionals = [
        // Sushi
        { name: "Cream Cheese" },
        { name: "Gengibre" },
        { name: "Molho Tarê" },
        { name: "Wasabi" },
        { name: "Sunomono" },
        { name: "Hashi" },
        { name: "Molho Shoyu" },

        // Hamburgueria
        { name: "Queijo Cheddar" },
        { name: "Queijo Suíço" },
        { name: "Bacon" },
        { name: "Ovo" },
        { name: "Cebola Caramelizada" },
        { name: "Picles" },
        { name: "Alface" },
        { name: "Tomate" },
        { name: "Molho Barbecue" },
        { name: "Maionese Especial" },

        // Pizzaria
        { name: "Catupiry" },
        { name: "Azeitona" },
        { name: "Orégano" },
        { name: "Calabresa" },
        { name: "Tomate Seco" },
        { name: "Borda Recheada" },
        { name: "Molho de Alho" },
        { name: "Manjericão" },
        { name: "Pimenta Calabresa" },
        { name: "Cebola Roxa" }
    ];

    for (const additional of additionals) {
        await prisma.additional.create({
            data: additional
        });
    }
}
export default createAdditional;