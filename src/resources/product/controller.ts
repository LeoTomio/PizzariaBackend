
import { NextFunction, Request, Response } from "express";
import { ProductService } from "./service";
export class ProductController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().GetOne(request.params.id).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().List('').then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}