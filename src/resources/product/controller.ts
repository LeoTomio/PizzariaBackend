
import { NextFunction, Request, Response } from "express";
import { ProductService } from "./service";
import { LogType } from "../log/interface";
export class ProductController {
    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().GetOne(request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.getOne} de produto`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}