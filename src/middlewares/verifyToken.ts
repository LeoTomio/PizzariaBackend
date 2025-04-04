import { Request, Response, NextFunction } from 'express';
import prismaClient from '../prisma';
import jwt from 'jsonwebtoken';

export async function verifyTokenLogin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ statusCode: 401, message: 'Token não informado' });
    }

    try {
        // Verifica validade do token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifica se o usuário ainda existe
        const user = await prismaClient.user.findUnique({
            where: { id: (decoded as any).sub }
        });

        if (!user) {
            return res.status(401).json({ statusCode: 401, message: 'Usuário não encontrado' });
        }

        // Injeta token decodificado no request
        req.token = jwt.decode(token);

        return next();
    } catch (err) {
        return res.status(401).json({ statusCode: 401, message: 'Token inválido', error: err.message });
    }
}
