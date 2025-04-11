import { NextFunction, Request, Response } from "express";
import { OrderService } from "./service";

export class OrderController {

    async List(request: Request, response: Response, next: NextFunction) {
        try { 
            return await new OrderService().List(request.params.url).then((data) => {
                response.locals.message = "Listagem de pedidos";
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try { 
            return await new OrderService().GetOne(request.params.url, request.params.id).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async ChangeStatus(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().ChangeStatus(request.params.id, request.body.status).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}