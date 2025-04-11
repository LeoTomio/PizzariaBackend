
import { NextFunction, Request, Response } from "express";
import { AdditionalService } from "./service";
import { LogType } from "../../log/interface";
export class AdditionalController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().GetOne(request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.getOne} de adicional`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().List().then((data) => {
                response.locals.logMessage = `${LogType.list} de adicionais`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().Create(request.body).then((data) => {
                response.locals.logMessage = `${LogType.create} de adicional`
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().Edit(request.body).then((data) => {
                response.locals.logMessage = `${LogType.update} de adicional`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new AdditionalService().Delete(request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.delete} de adicional`
                return response.status(204).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}