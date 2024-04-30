import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import UserRoles from "../../enums/UserRoles";

function writerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user
        if (!user) {
            throw ApiError.Unauthorized("User is not authorized")
        }

        if (user.role !== UserRoles.WRITER && user.role !== UserRoles.ADMIN) {
            throw ApiError.Forbidden("You don't have rights to add, update and/or delete posts")
        }

        next()
    } catch(e) {
        next(e)
    }
}

export default writerMiddleware