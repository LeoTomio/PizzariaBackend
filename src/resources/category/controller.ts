import { Request, Response } from "express";
import { tokenDecodifier } from '../../utils/tokenDecodify';
import { Token } from '../user/interface';
import { CategoryService } from "./service";

export class CategoryController {

    async GetOne(request: Request, response: Response) {
        try {
            return await new CategoryService().GetOne(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async List(request: Request, response: Response) {
        try {
            const token = tokenDecodifier(request.headers.authorization) as Token

            return await new CategoryService().List(token).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Create(request: Request, response: Response) {
        try {
            const token = tokenDecodifier(request.headers.authorization) as Token
            return await new CategoryService().Create(request.body, token).then((data) => {
                return response.status(data.statusCode || 201).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Edit(request: Request, response: Response) {
        try {
            return await new CategoryService().Edit(request.body).then((data) => {
                return response.status(data.statusCode || 200).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Delete(request: Request, response: Response) {
        try {
            return await new CategoryService().Delete(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
}