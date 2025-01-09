import { NextFunction, Request, Response } from "express";
import { CompanyService } from "./service";
import { UploadedFile } from "express-fileupload";
import { uploadImage } from "../../externalServices/cloudinary";

export class CompanyController {

    async GetOne(request: Request, response: Response) {
        try {
            console.log(request.params.id)
            return await new CompanyService().GetOne(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async List(request: Request, response: Response) {
        try {
            return await new CompanyService().List().then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.files || Object.keys(request.files).length === 0) {
                throw new Error("Erro ao enviar imagem");
            }
            const file = request.files['file'] as UploadedFile;
            const resultFile = await uploadImage(file);
            request.body.banner = resultFile.url;

            return await new CompanyService().Create(request.body, next).then((data) => {
                return response.status(201).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            const isEdit = !request.files && !request.body.file;
            if (isEdit) {
                throw new Error("Imagem é obrigatória")
            }

            if (request.files && Object.keys(request.files).length > 0) {
                const file = request.files['file'] as UploadedFile;
                const resultFile = await uploadImage(file)
                request.body.banner = resultFile.url;
            }
            return await new CompanyService().Edit(request.body, next).then((data) => {
                return response.status(200).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Delete(request.params.id, next).then((data) => {
                return response.status(204).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async Inactive(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CompanyService().Inactive(request.params.id, next).then((data) => {
                return response.status(204).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

}