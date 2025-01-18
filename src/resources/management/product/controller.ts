
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadImage } from "../../../externalServices/cloudinary";
import { moneyFormater } from "../../../utils/moneyFormat";
import { ProductService } from "./service";
import { Token } from "../../user/interface";
export class ProductController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().GetOne(request.params.id, request.token as Token).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            console.log('list')
            const company_id = request.params.id || request.token.company_id
            return await new ProductService().List(company_id).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().Create(request.body, request.files, request.token as Token).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().Edit(request.body, request.files, request.token as Token).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().Delete(request.params.id, request.token as Token).then((data) => {
                return response.status(204).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}