import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import CommentService from "../services/CommentService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import PgCommentRepository from "../repositories/implemented/postgre/PgCommentRepository";

class CommentController {
    private readonly service: CommentService

    constructor() {
        this.service = new CommentService(new PgCommentRepository())
    }

    getComments = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const comments = await this.service.getComments()
            return res.send(comments)
        } catch(e) {
            next(e)
        }
    }
    getCommentsForPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params
            const comments = await this.service.getCommentsForPost(postId)

            return res.send(comments)
        } catch(e) {
            next(e)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.status(HttpStatusCodes.BAD_REQUEST).send({
                    message: "Validation of body has failed",
                    errorStack: result
                })
            }
            
            const { text, repliedToId, postId } = req.body
            const user = req.user

            const comment = await this.service.createPostComment({ text, userId: user.id, repliedToId, postId })
            return res.status(HttpStatusCodes.UPLOADED).send(comment)
        } catch(e) {
            next(e)
        }
    }
}

export default new CommentController()