import { NextFunction, Request, Response } from "express";
import { UserService } from "./service";
import { LogType } from "../log/interface";

export class UserController {
    async detailUser(request: Request, response: Response, next: NextFunction) {
        try {
            return await new UserService().DetailUser(request.token.sub).then((data) => {
                response.locals.logMessage = `${LogType.info} do usuário`;
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        try {
            return await new UserService().CreateUser(request.body).then((data) => {
                response.locals.logMessage = `${LogType.create} de usuário`;
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async authUser(request: Request, response: Response, next: NextFunction) {
        try {
            return await new UserService().AuthUser(request.body).then((data) => {
                response.locals.logMessage = `${LogType.autentication} de usuário`;
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}