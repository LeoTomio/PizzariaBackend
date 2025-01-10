
import { NextFunction, Request, Response } from "express";
import { ProductService } from "./service";
import { UploadedFile } from "express-fileupload";
import { moneyFormater } from "../../utils/moneyFormat";
import { uploadImage } from "../../externalServices/cloudinary";
export class ProductController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().GetOne(String(request.params.id)).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().List().then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.files || Object.keys(request.files).length === 0) {
                throw {
                    message: "Erro ao enviar imagem",
                    status: 500
                };
            }

            const file = request.files['file'] as UploadedFile;
            const resultFile = await uploadImage(file);
            request.body.banner = resultFile.url;
            request.body.price = moneyFormater(request.body.price);

            return await new ProductService().Create(request.body).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            const isEdit = !request.files && !request.body.file;
            if (isEdit) {
                throw {
                    message: "Imagem é obrigatória",
                    status: 400
                };
            }

            if (request.files && Object.keys(request.files).length > 0) {
                const file = request.files['file'] as UploadedFile;

                const resultFile = await uploadImage(file)
                request.body.banner = resultFile.url;

            }
            request.body.price = moneyFormater(request.body.price)
            return await new ProductService().Edit(request.body).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new ProductService().Delete(request.params.id).then((data) => {
                return response.status(204).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}