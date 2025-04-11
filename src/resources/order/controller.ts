import { NextFunction, Request, Response } from "express";
import { OrderService } from "./service";
import { LogType } from "../log/interface";

export class OrderController {
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().Create(request.params.url, request.body).then((data) => {
                response.locals.logMessage = `${LogType.create} de pedido`
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}