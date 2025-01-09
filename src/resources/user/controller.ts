import { NextFunction, Request, Response } from "express";
import { UserService } from "./service";

export class UserController {
    async detailUser(request: Request, response: Response) {
        try {
            return await new UserService().DetailUser(request.user_id).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        try {
            return await new UserService().CreateUser(request.body, next).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async authUser(request: Request, response: Response) {
        try {
            return await new UserService().AuthUser(request.body).then((data) => {
                return response.status(data.statusCode || 200).send(data)

            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
}
