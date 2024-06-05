import { NextFunction, Request, Response } from "express";

import CommentService from "../services/CommentService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import PgCommentRepository from "../repositories/implemented/postgre/PgCommentRepository";
import { RequestWithBody } from "../../utils/types/DifferentiatedRequests";
import CommentInputDto from "../models/dto/comments/CommentInputDto";

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
    create = async (req: RequestWithBody<CommentInputDto>, res: Response, next: NextFunction) => {
        try {            
            const user = req.user
            const comment = await this.service.createPostComment({
                ...req.body,
                userId: user.id,
            })
            
            return res.status(HttpStatusCodes.UPLOADED).send(comment)
        } catch(e) {
            next(e)
        }
    }
}

export default new CommentController()