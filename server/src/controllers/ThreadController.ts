import { Request, Response, NextFunction } from "express";

import PgThreadRepository from "../repositories/implemented/postgre/PgThreadRepository"
import ThreadService from "../services/ThreadService"
import { RequestWithBody, RequestWithParams } from "../../utils/types/DifferentiatedRequests";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import ThreadInputDto from "../models/dto/threads/ThreadInputDto";
import ThreadUpdateDto from "../models/dto/threads/ThreadUpdateDto";
import { ApiError } from "../../utils/errors/ApiError";

class ThreadController {
    private readonly service: ThreadService

    constructor() {
        this.service = new ThreadService(new PgThreadRepository())
    }

    getThreads = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const threads = await this.service.getThreads()
            return res.send({ threads })
        } catch(e) {
            next(e)
        }
    }
    getThreadByLink = async (req: RequestWithParams<{ link: string }>, res: Response, next: NextFunction) => {
        try {
            const thread = await this.service.getThreadByLink(req.params.link)
            return res.send(thread)
        } catch(e) {
            next(e)
        }
    }
    create = async (req: RequestWithBody<ThreadInputDto>, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            const thread = await this.service.create({
                ...req.body,
                authorId: req.user.id
            })
            return res.send(thread)
        } catch(e) {
            next(e)
        }
    }
    update = async (req: RequestWithBody<ThreadUpdateDto>, res: Response, next: NextFunction) => {
        try {
            if (req.user.id !== req.body.authorId) {
                throw ApiError.Forbidden("This thread isn't belonging to you")
            }

            const thread = await this.service.update(req.body)
            return res.status(HttpStatusCodes.UPLOADED).send(thread)
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
    registerView = async (req: RequestWithBody<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            await this.service.registerView(req.body.id)
            
            return res.status(HttpStatusCodes.UPLOADED).send({
                message: 'View was added successfully'
            })
        } catch(e) {
            next(e)
        }
    }
}

export default new ThreadController()