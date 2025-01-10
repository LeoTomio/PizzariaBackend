import { Request, Response, Router } from 'express';
import prismaClient from '../prisma';
import { decode, loginJwt } from './loginJwt';
let verifyLogin;

export function verifyTokenLogin(router: Router) {
    router.use((request: Request, response: Response, next) => {
        const token = request.headers.authorization?.split(' ')[1];
        try {
            loginJwt(token)
            request.token = decode(token);

            return next();
        } catch {
            return response.status(401).end();
        }
    });
};



export async function tokenValidator(request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    verifyLogin = await loginJwt(token);

    if (verifyLogin.statusCode === 401) {
        return false;
    }
    return !!await prismaClient.user.findUnique({
        where: { id: verifyLogin.sub }
    })

};


