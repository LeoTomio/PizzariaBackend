import { NextFunction, Request, Response } from "express";
import { LogService } from "../resources/log/service";
import { Method } from "@prisma/client";

export async function logMiddleware(request: Request, response: Response, next: NextFunction) {
    // Rotas para não salvar log
    const skipLogRoutes = [
        '/management/user/me',
    ];
    let responseBody: any = null;
    const shouldCaptureResponse = request.originalUrl === '/user/session';

    if (shouldCaptureResponse) {
        const originalSend = response.send.bind(response);
        response.send = (body: any): Response => {
            responseBody = body;
            return originalSend(body);
        };
    }
    const generateMessage = (request: Request) => {
        if (shouldCaptureResponse) {
            return `Login realizado ${request.originalUrl}`;
        }
        if (request.method === 'POST') {
            return `Criando novo registro em ${request.originalUrl}`;
        } else if (request.method === 'GET') {
            return `Acessando dados em ${request.originalUrl}`;
        } else if (request.method === 'PUT') {
            return `Atualizando registro em ${request.originalUrl}`;
        } else if (request.method === 'DELETE') {
            return `Deletando registro em ${request.originalUrl}`;
        }
        return `Ação não identificada em ${request.originalUrl}`;
    };

    response.on("finish", () => {
        if (skipLogRoutes.includes(request.originalUrl)) {
            return;
        }
        let url = request.body?.url || request.params?.url || request.query?.url
        if (shouldCaptureResponse) {
            url = JSON.parse(responseBody).url
        }

        new LogService().LogRegister({
            requestUrl: request.originalUrl,
            message: generateMessage(request),
            metadata: {
                data: request.body || request.query || request.params || {}
            },
            method: request.method as Method,
            status: response.statusCode,
            url: url,
            user_id: request.token?.sub || null,
        });

        console.log('[MIDDLEWARE] resposta finalizada:', response.statusCode, request.originalUrl);
    });

    next();
}
