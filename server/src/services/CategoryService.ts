import CategoryModel from "../models/domain/Category";
import ICategoryRepository from "../repositories/ICategoryRepository";
import PgCategoryRepository from "../repositories/implemented/postgre/PgCategoryRepository";

class CategoryService {
    constructor(private repository: ICategoryRepository) {}

    async getCategories(): Promise<CategoryModel[]> {
        const categories = await this.repository.getCategories();
        return categories
    }
    async getByCategoryCode(code: string): Promise<CategoryModel> {
        const category = await this.repository.getByCategoryCode(code)
        return category
    }
}

export default new CategoryService(new PgCategoryRepository())