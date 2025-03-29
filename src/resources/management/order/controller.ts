import { NextFunction, Request, response, Response } from "express";
import { OrderService } from "./service";

export class OrderController {
    async Create(request: Request, respose: Response) {
        const createrOrderService = new OrderService();
        const order = await createrOrderService.Create(request.body);

        return respose.json(order);
    }

    async Remove(request: Request, response: Response, next: NextFunction) {
        const removeOrder = new OrderService();
        const order = await removeOrder.Remove(request.params.id);

        return response.json(order);
    }

    async Send(request: Request, response: Response, next: NextFunction) {
        const sendOrder = new OrderService();
        const order = await sendOrder.Send(request.params.id);

        return response.json(order);
    }
    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new OrderService().List(request.params.url).then((data) => {
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

    async Finish(request: Request, response: Response, next: NextFunction) {
        const finishOrder = new OrderService();
        const order = await finishOrder.Finish(request.params.id);

        return response.json(order);
    }
}