import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import TokenHelper from "../../helpers/TokenHelper";

function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw ApiError.Unauthorized('User is not authorized')
        }

        const accessToken = authorizationHeader?.split(' ')[1]
        if (!accessToken) {
            throw ApiError.Unauthorized('User is not authorized')
        }

        const userData = TokenHelper.validateAccessToken(accessToken)
        if (!userData) {
            throw ApiError.Unauthorized('User is not authorized')
        }

        req.user = userData

        next()
    } catch(e) {
        return next(ApiError.Unauthorized('User is not authorized'))
    }
}

export default authMiddleware