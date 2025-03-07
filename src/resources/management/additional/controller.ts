
import { NextFunction, Request, Response } from "express";
import { AdditionalService } from "./service";
export class AdditionalController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().GetOne(request.params.id).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().List().then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().Create(request.body).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().Edit(request.body).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().Delete(request.params.id).then((data) => {
                return response.status(204).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}