import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";

class CategoryController {
    async getCategories(_req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await CategoryService.getCategories()
            return res.send(categories)
        } catch(e) {
            next(e)
        }
    }
    async getByCategoryCode(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.params
            
            const category = await CategoryService.getByCategoryCode(code)
            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
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

            const category = await CategoryService.create(data)
            return res.send(category)
        } catch(e) {
            next(e)
        }
    }
}

export default new CategoryController()