import { NextFunction, Request, Response } from "express";

import CategoryService from "../services/CategoryService";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";
import PgCategoryRepository from "../repositories/implemented/postgre/PgCategoryRepository";
import { RequestWithBody, RequestWithParams } from "../../utils/types/DifferentiatedRequests";

class CategoryController {
    private readonly service: CategoryService

    constructor() {
        this.service = new CategoryService(new PgCategoryRepository())
    }

    getCategories = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.service.getCategories()
            return res.send(categories)
        } catch(e) {
            next(e)
        }
    }
    getByCategoryCode = async (req: RequestWithParams<{ code: string }>, res: Response, next: NextFunction) => {
        try {
            const category = await this.service.getByCategoryCode(req.params.code)

            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
    getCategoriesByPostsLengthSorted = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.service.getCategoriesByPostsLengthSorted()
            
            return res.send(categories)
        } catch(e) {
            next(e)
        }
    }
    create = async (req: RequestWithBody<CategoryCreateDto>, res: Response, next: NextFunction) => {
        try {
            const category = await this.service.create(req.body)
            
            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
}

export default new CategoryController()