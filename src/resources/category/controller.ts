import { NextFunction, Request, Response } from "express";
import { tokenDecodifier } from '../../utils/tokenDecodify';
import { Token } from '../user/interface';
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
            const token = tokenDecodifier(request.headers.authorization) as Token

            return await new CategoryService().List(token).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            const token = tokenDecodifier(request.headers.authorization) as Token
            return await new CategoryService().Create(request.body, token).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().Edit(request.body).then((data) => {
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CategoryService().Delete(request.params.id).then((data) => {
                return response.status(204).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
}