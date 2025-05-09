import { NextFunction, Request, Response } from "express";
import { CompanyStyleService } from "./service";
import { Token } from "../user/interface";
import { LogType } from "../../log/interface";

export class CompanyStyleController {

  async GetOne(request: Request, response: Response, next: NextFunction) {
    try {
      return await new CompanyStyleService().GetOne(request.params.url).then((data) => {
        response.locals.logMessage = `${LogType.getOne} de estilos da empresa`

        console.log('retorno', data)
        return response.status(200).send(data)
      })
    } catch (error) {
      next(error)
    }
  }
  async Create(request: Request, response: Response, next: NextFunction) {
    try {
      return await new CompanyStyleService().Create(request.body).then((data) => {
        response.locals.logMessage = `${LogType.create} de estilos da empresa`
        return response.status(201).send(data)
      })
    } catch (error) {
      next(error)
    }
  }
  async Edit(request: Request, response: Response, next: NextFunction) {
    try {
      return await new CompanyStyleService().Edit(request.body).then((data) => {
        response.locals.logMessage = `${LogType.update} de estilos da empresa`
        return response.status(200).send(data);
      })
    } catch (error) {
      next(error)
    }
  }
}

