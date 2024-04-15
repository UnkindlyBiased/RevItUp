import { NextFunction, Request, Response } from "express";
import CommentService from "../services/CommentService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import { validationResult } from "express-validator";

class CommentController {
    async getComments(_req: Request, res: Response, _next: NextFunction) {
        const comments = await CommentService.getComments()
        return res.send(comments)
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.status(HttpStatusCodes.BAD_REQUEST).send({
                    message: "Validation of body has failed",
                    errorStack: result
                })
            }
            
            const { text, repliedToId } = req.body
            const user = req.user

            const comment = await CommentService.create({ text, userId: user.id, repliedToId })
            return res.status(HttpStatusCodes.UPLOADED).send(comment)
        } catch(e) {
            next(e)
        }
    }
}

export default new CommentController()