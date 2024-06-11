import { NextFunction, Request, Response } from "express";

import CommentService from "../services/CommentService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import PgCommentRepository from "../repositories/implemented/postgre/PgCommentRepository";
import { RequestWithBody, RequestWithParams } from "../../utils/types/DifferentiatedRequests";
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
    getCommentsForPost = async (req: RequestWithParams<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const comments = await this.service.getCommentsForPost(req.params.id)

            return res.send(comments)
        } catch(e) {
            next(e)
        }
    }
    getCommentsForThread = async (req: RequestWithParams<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const threads = await this.service.getCommentsForThread(req.params.id)
            return res.send(threads)
        } catch(e) {
            next(e)
        }
    }
    createPostComment = async (req: RequestWithBody<CommentInputDto>, res: Response, next: NextFunction) => {
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
    createThreadComment = async (req: RequestWithBody<CommentInputDto>, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const comment = await this.service.createThreadComment({
                ...req.body,
                userId: user.id,
            })
            
            return res.status(HttpStatusCodes.UPLOADED).send(comment)
        } catch(e) {
            next(e)
        }
    }
    delete = async (req: RequestWithBody<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.body.id)
            return res.status(HttpStatusCodes.DELETED).send()
        } catch(e) {
            next(e)
        }
    }
}

export default new CommentController()