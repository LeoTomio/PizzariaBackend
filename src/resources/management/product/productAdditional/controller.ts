
import { NextFunction, Request, Response } from "express";
import { ProductAdditionalService } from "./service";
import { LogType } from "../../../log/interface";
export class ProductAdditionalController {

    async GetList(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().GetList(request.params.product_id).then((data) => {
                response.locals.logMessage = `${LogType.list} de adicionais do produto`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().Create(request.body).then((data) => {
                response.locals.logMessage = `${LogType.create} de adicional do produto`
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().Edit(request.params.id, request.body.price).then((data) => {
                response.locals.logMessage = `${LogType.update} de adicional do produto`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductAdditionalService().Delete(request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.delete} de adicional do produto`
                return response.status(204).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}