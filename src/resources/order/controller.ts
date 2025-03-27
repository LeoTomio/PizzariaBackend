import { NextFunction, Request, Response } from "express";
import { OrderService } from "./service";

export class OrderController {
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().Create(request.params.url, request.body).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}