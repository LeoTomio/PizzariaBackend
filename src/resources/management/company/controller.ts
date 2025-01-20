import { NextFunction, Request, Response } from "express";
import { CompanyService } from "./service";
import { UploadedFile } from "express-fileupload";
import { uploadImage } from "../../../externalServices/cloudinary";
import { Token } from "../../user/interface";

export class CompanyController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            const company_id = request.params.id || request.token.company_id
            return await new CompanyService().GetOne(company_id, request.token as Token).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().List(request.token as Token).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Create(request.body, request.token as Token).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Edit(request.body, request.files, request.token as Token).then((data) => {
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Delete(request.params.id, request.token as Token).then((data) => {
                return response.status(204).send(data);
            })
        } catch (error) {
            next(error)
        }
    }

    async changeStatus(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().changeStatus(request.params.id, request.token as Token).then((data) => {
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
}