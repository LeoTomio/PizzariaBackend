import { NextFunction, Request, Response } from "express";
import { CompanyService } from "./service";
import { LogType } from "../log/interface";

export class CompanyController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().GetOne(request.params.url).then((data) => {
                response.locals.logMessage = `${LogType.info} da empresa`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}