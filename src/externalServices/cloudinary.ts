import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Função para upload de imagem
export async function uploadImage(file: UploadedFile): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
            if (error) {
                return reject(error as UploadApiErrorResponse);
            }
            resolve(result as UploadApiResponse);
        }).end(file.data);
    });
}
