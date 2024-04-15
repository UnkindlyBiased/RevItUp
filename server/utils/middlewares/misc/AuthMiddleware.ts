import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import TokenHelper from "../../helpers/TokenHelper";
import UserTokenDto from "../../../src/models/dto/users/UserTokenDto";

// TODO: move the extenstion to another place and cope with workarounds to make this thing working
declare module 'express-serve-static-core' {
    export interface Request {
        user: UserTokenDto
    }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
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