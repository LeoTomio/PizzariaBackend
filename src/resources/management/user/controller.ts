import { NextFunction, Request, Response } from "express";
import { UserService } from "./service";

export class UserController {
    async detailUser(request: Request, response: Response, next: NextFunction) {
        try {
            return await new UserService().DetailUser(request.token.sub).then((data) => {
                response.locals.logMessage = `Informações do usuário`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}
