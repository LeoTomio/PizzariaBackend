import { NextFunction, Request, Response } from "express";
import { CompanyService } from "./service";
import { Token } from "../user/interface";
import { LogType } from "../../log/interface";

export class CompanyController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().GetOne(request.params.url, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.getOne} de empresa`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().List(request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.list} de empresas`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Create(request.body, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.create} de empresa`
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Edit(request.body, request.files, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.update} de empresa`
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Delete(request.params.id, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.delete} de empresa`
                return response.status(204).send(data);
            })
        } catch (error) {
            next(error)
        }
    }

    async changeStatus(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().changeStatus(request.params.url, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.statusChange} da empresa`
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
    async changeOperational(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().changeOperational(request.params.id, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.active} da empresa`
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
}