import { NextFunction, Request, Response } from "express";
import { CouponService } from "./service";

export class CouponController {

    async Find(request: Request, response: Response, next: NextFunction) {
        try { 
            return await new CouponService().Find(request.params.url, request.params.code).then((data) => {
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
}