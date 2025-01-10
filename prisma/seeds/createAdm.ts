import { NextFunction } from 'express';
import { hash } from "bcryptjs";
import prismaClient from "../../src/prisma";

async function createAdm() {
    const email = 'a@a.com';
    const name = 'Administrador'

    // Verifica se o usuário já existe
    const existingUserByEmail = await prismaClient.user.findFirst({
        where: { email },
    });
    const existingUserByName = await prismaClient.user.findFirst({
        where: { name },
    });

    if (existingUserByEmail || existingUserByName) {
        throw {
            message: "Usuário já existe",
            status: 409
        };
    }

    // Cria o usuário caso não exista
    const password = await hash("1", 8);
    await prismaClient.user.create({
        data: {
            email,
            name,
            password,
            type: "ADMIN",
        },
    });

    console.log("Usuário administrador criado com sucesso!");
}

export default createAdm;
