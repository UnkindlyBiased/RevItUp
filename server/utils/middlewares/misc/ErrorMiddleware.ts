import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../errors/ApiError'
import { HttpStatusCodes } from '../../enums/HttpStatusCodes'

function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
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