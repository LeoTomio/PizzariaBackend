import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { AuthRequest, UserRequest } from "./interface";

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

    async CreateUser(response: UserRequest) {
        const { email } = response
        if (!email) {
            throw { message: "Email incorreto", status: 400 };
        }

        await this.FindFirst(email).then((exist) => {
            if (exist) {
                throw { message: "Usuário já existe", status: 409 };
            }
        })
        response.password = await hash(response.password, 8)
        return await prismaClient.user.create({
            data: {
                ...response
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
            where: {
                email: email
            }
        })
        if (!user || !await compare(password, user.password)) {
            throw { message: "Usuário ou senha errado", status: 400 };
        }
        const token = sign({
            name: user.name,
            email: user.email,
            type: user.type,
            company_id: user.company_id
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
}