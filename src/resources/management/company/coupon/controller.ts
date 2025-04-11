import { NextFunction, Request, Response } from "express";
import { CouponService } from "./service";
import { Token } from "../../user/interface";
import { LogType } from "../../../log/interface";

export class CouponController {

    async GetOne(request: Request, response: Response, next: NextFunction) {
        try {
            const company_id = request.params.url || request.token.url
            return await new CouponService().GetOne(company_id, request.token as Token).then((data) => {
                response.locals.logMessage = `${LogType.getOne} de cupom`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }

    async List(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CouponService().List(request.params.url).then((data) => {
                response.locals.logMessage = `${LogType.list} de cupons`
                return response.status(200).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CouponService().Create(request.body).then((data) => {
                response.locals.logMessage = `${LogType.create} de cupom`
                return response.status(201).send(data)
            })
        } catch (error) {
            next(error)
        }
    }
    async Edit(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CouponService().Edit(request.body).then((data) => {
                response.locals.logMessage = `${LogType.update} de cupom`
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }

    async Delete(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CouponService().Delete(request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.delete} de cupom`
                return response.status(204).send(data);
            })
        } catch (error) {
            next(error)
        }
    }

    async ChangeStatus(request: Request, response: Response, next: NextFunction) {
        try {
            return await new CouponService().ChangeStatus(request.params.id).then((data) => {
                response.locals.logMessage = `${LogType.statusChange} de cupom`
                return response.status(200).send(data);
            })
        } catch (error) {
            next(error)
        }
    }
}