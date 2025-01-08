export class accountController {


    async Get(request: Request, response: Response) {
        try {
            return await new CategoryService().GetOne(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Edit(request: Request, response: Response) {
        try {
            return await new CategoryService().Edit(request.body).then((data) => {
                return response.status(data.statusCode || 200).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }
    async Delete(request: Request, response: Response) {
        try {
            return await new CategoryService().Delete(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data);
            })
        } catch (error) {
            return response.status(error.statusCode || 500).send(error)
        }
    }

}