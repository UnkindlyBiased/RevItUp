import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";
import PgCategoryRepository from "../repositories/implemented/postgre/PgCategoryRepository";

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
    getByCategoryCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.params
            
            const category = await this.service.getByCategoryCode(code)
            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
    getCategoriesByPostsLengthSorted = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.service.getCategoriesByPostsLengthSorted()
            return res.send(categories)
        } catch(e) {
            next(e)
        }
    }
    // TODO: check if using the spread operator is possible
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, color, logo, code, biography, creationDate } = req.body
            const data: CategoryCreateDto = {
                categoryName: name,
                categoryColor: color,
                categoryLogo: logo,
                categoryCode: code,
                biography: biography || null,
                categoryCreationDate: creationDate
            }

            const category = await this.service.create(data)
            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
}

export default new CategoryController()