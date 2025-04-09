import { Request, Response, NextFunction } from 'express';
import { Token } from '../resources/management/user/interface';

export async function permissionGuard(req: Request, res: Response, next: NextFunction) {
    const token: Token = req.token;
    // console.warn('Rota acessada:', req.originalUrl);
    // console.error('token', token.url)
    // console.log('params', req.params?.url)
    // console.log('query', req.query?.url)
    // console.log('body', req.body?.url)

    if (token.type !== "ADMIN") {
        if (!token || !token.url) {
            throw {
                message: "Token inválido ou mal formatado.",
                status: 401
            }
        }

        const requestedUrl = req.body?.url || req.params?.url || req.query?.url;
        if (!requestedUrl) {
            throw {
                message: "URL da empresa não encontrada na requisição.",
                status: 401
            }
        }
        if (requestedUrl !== token.url) {
            throw {
                message: "Token inválido ou mal formatado.",
                status: 401
            }
        }
    }
    next();
}
