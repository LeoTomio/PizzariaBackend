
import { hash } from "bcryptjs";
import prismaClient from "../../src/prisma";


async function createAdm() {
    const password = await hash("1", 8);
    await prismaClient.user.create({
        data: {
            email: 'a@a.com',
            name: 'Administrador',
            password: password,
            type: "ADMIN",
        },
    });
}

export default createAdm