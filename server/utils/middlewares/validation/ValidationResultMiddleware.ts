import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import { HttpStatusCodes } from '../../enums/HttpStatusCodes'

function validationResultMiddleware(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).send({
            message: "Validation of body has failed",
            errorStack: result
        })
    }

    return next()
}

export default validationResultMiddleware