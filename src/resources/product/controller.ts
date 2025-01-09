
import { Request, Response } from "express";
import { ProductService } from "./service";
import { UploadedFile } from "express-fileupload";
import { moneyFormater } from "../../utils/moneyFormat";
import { uploadImage } from "../../externalServices/cloudinary";
export class ProductController {

    async GetOne(request: Request, response: Response) {
        try {
            return await new ProductService().GetOne(String(request.params.id)).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async List(request: Request, response: Response) {
        try {
            return await new ProductService().List().then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async Create(request, response) {
        try {
            if (!request.files || Object.keys(request.files).length === 0) {
                throw new Error("Erro ao enviar imagem");
            }

            const file = request.files['file'] as UploadedFile;
            const resultFile = await uploadImage(file);
            request.body.banner = resultFile.url;
            request.body.price = moneyFormater(request.body.price);

            return await new ProductService().Create(request.body).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async Edit(request: Request, response: Response) {
        try {
            const isEdit =!request.files && !request.body.file;
            if (isEdit) {
                throw new Error("Imagem é obrigatória")
            }

            if (request.files && Object.keys(request.files).length > 0) {
                const file = request.files['file'] as UploadedFile;

                const resultFile = await uploadImage(file)
                request.body.banner = resultFile.url;

            }
            request.body.price = moneyFormater(request.body.price)
            return await new ProductService().Edit(request.body).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async Delete(request: Request, response: Response) {
        try {
            return await new ProductService().Delete(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
}