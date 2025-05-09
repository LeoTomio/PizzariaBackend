import { NextFunction, Request, Response } from "express";
import { OrderService } from "./service";
import { LogType } from "../../log/interface";

export class OrderController {

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().List(request.params.url).then((data) => {
                response.locals.logMessage = `${LogType.list} de pedidos`;
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().GetOne(request.params.url, request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.getOne} de pedido`;
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async ChangeStatus(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().ChangeStatus(request.params.id, request.body.status).then((data) => {
                response.locals.logMessage = `${LogType.statusChange} de pedido`;
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}