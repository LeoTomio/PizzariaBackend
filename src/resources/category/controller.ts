import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./service";

export class CategoryController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().GetOne(request.params.id).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().List(request.params.url).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}