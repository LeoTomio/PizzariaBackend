import { Prisma } from "@prisma/client";
import multer from "multer";

export default function errorHandler(err, req, res, next) {
    // logger.error(err);   //caso queira usar, instalar winston

    const { status, message } = getExceptionResponse(err);

    res.status(status).json({
        status,
        statusText: message || "Ocorreu um erro",
    });
}

function getExceptionResponse(exception) {
    let status;
    let message;

    if (exception.name === 'UnauthorizedError') {
        status = 401;
        message = 'Token inválido ou ausente.';
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        switch (exception.code) {
            case 'P2002':
                status = 409;
                message = `O valor fornecido para o campo '${exception.meta.target}' já está em uso.`;
                break;
            case 'P2025':
                status = 404;
                message = 'Registro não encontrado.';
                break;
            default:
                status = 400;
                message = exception.message;
                break;
        }
    } else if (exception instanceof multer.MulterError) {
        status = 400;
        message = exception.message.includes('Arquivo não suportado')
            ? 'Arquivo não suportado.'
            : 'Erro no upload de arquivos.';
    } else if (exception.status && exception.message) {
        status = exception.status;
        message = exception.message;
    } else {
        status = exception.statusCode || 500;
        message = exception.message || 'Erro desconhecido';
    }
    console.log("Erro ->", {
        Erro: message,
        Statuscode: status
    })
    return { status, message };
}

module.exports = errorHandler;
