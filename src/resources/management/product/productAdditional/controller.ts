
import { NextFunction, Request, Response } from "express";
import { ProductAdditionalService } from "./service";
export class ProductAdditionalController {

    async GetList(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().GetList(request.params.product_id).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().Create(request.body).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().Edit(request.body).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().Delete(request.params.id).then((data) => {
                return response.status(204).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}