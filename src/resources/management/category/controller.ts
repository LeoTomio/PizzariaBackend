import { NextFunction, Request, Response } from "express";

import { CategoryService } from "./service";
import { Token } from "../user/interface";

export class CategoryController {
    //sem uso
    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().GetOne(request.params.id, request.token as Token).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async List(request: Request, response: Response, next: NextFunction) {
        try {
            const url = request.params.url || request.token.url
            return await new CategoryService().List(url).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().Create(request.body, request.query.url as string, request.token as Token).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Edit(request: Request, response: Response, next: NextFunction) {
        try {

            return await new CategoryService().Edit(request.body, request.token as Token).then((data) => {
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().Delete(request.params.id, request.token as Token).then((data) => {
                return response.status(204).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
}