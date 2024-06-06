import { Request, Response, NextFunction } from "express";

import PgThreadCategoryRepository from "../repositories/implemented/postgre/PgThreadCategoryRepository";
import ThreadCategoryService from "../services/ThreadCategoryService";
import { RequestWithParams } from "../../utils/types/DifferentiatedRequests";

class ThreadCategoryController {
    private readonly service: ThreadCategoryService

    constructor() {
        this.service = new ThreadCategoryService(new PgThreadCategoryRepository())
    }

    getThreadCategories = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.service.getThreadCategories()
            return res.send(categories)
        } catch(e) {
            next(e)
        }
    }
    getThreadCategoryByCode = async (req: RequestWithParams<{ code: string }>, res: Response, next: NextFunction) => {
        try {
            const category = await this.service.getThreadCategoriesByCode(req.params.code)
            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
}

export default new ThreadCategoryController()