import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { AuthRequest, UserRequest } from "./interface";
import { User } from "@prisma/client";

export class UserService {

    async DetailUser(user_id: string) {
        return await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                type: true
            }
        })
    }

    async CreateUser(user: UserRequest) {

        const { email } = user
        if (!email) {
            throw { message: "Email incorreto", status: 400 };
        }

        await this.FindFirst(email).then((exist) => {
            if (exist) {
                throw { message: "Usuário já existe", status: 409 };
            }
        })
        user.password = await hash(user.password, 8)
        return await prismaClient.user.create({
            data: {
                ...user
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
    }

    async AuthUser(response: AuthRequest) {
        const { email, password } = response
        const user = await prismaClient.user.findFirst({
            include: {
                company: {
                    select: {
                        url: true
                    }
                }
            },
            where: {
                email: email
            }
        })
        if (!user || !await compare(password, user.password)) {
            throw { message: "Usuário ou senha incorretos", status: 400 };
        }
        const token = sign({
            name: user.name,
            email: user.email,
            type: user.type,
            company_id: user.company_id,
            url: user?.company?.url
        },
            process.env.JWT_SECRET,
            {

                subject: user.id,
                expiresIn: '30d'
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: token
        }
    }

    async FindFirst(email: string) {
        return await prismaClient.user.findFirst({ where: { email: email } })
    }

    async Edit(userData: Partial<User>) {
        const { id, name, email, password } = userData;
        if (!id) {
            throw {
                message: "O ID do usuário é obrigatório.",
                status: 400
            };
        }
        const existingUser = await prismaClient.user.findUnique({ where: { id } });
        if (!existingUser) {
            throw {
                message: "Usuário não encontrado",
                status: 404
            };
        }
        if (password) {
            userData.password = await hash(userData.password, 8)
        }
        return await prismaClient.user.update({
            data: {
                name: name || undefined,
                email: email || undefined,
                password: userData.password || undefined,
                updated_at: new Date(),
            },
            where: { id }
        });
    }
}