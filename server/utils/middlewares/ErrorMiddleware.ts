import { Request, Response } from 'express'
import { ApiError } from '../errors/ApiError'
import { HttpStatusCodes } from '../enums/HttpStatusCodes'

function errorMiddleware(err: Error, _req: Request, res: Response) {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            error: err.status,
            message: err.message,
            stack: err.errors
        })
    }

    return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: HttpStatusCodes.BAD_REQUEST,
        message: 'Internal server error'
    })
}

export default errorMiddleware