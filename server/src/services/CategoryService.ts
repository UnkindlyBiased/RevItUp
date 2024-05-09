import CategoryModel from "../models/domain/Category";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";
import CategoryShortDto from "../models/dto/categories/CategoryShortDto";
import ICategoryRepository from "../repositories/ICategoryRepository";
import PgCategoryRepository from "../repositories/implemented/postgre/PgCategoryRepository";

class CategoryService {
    constructor(private repository: ICategoryRepository) {}

    async getCategories(): Promise<CategoryShortDto[]> {
        const categories = await this.repository.getCategories();
        return categories
    }
    async getByCategoryCode(code: string): Promise<CategoryModel> {
        const category = await this.repository.getByCategoryCode(code)
        return category
    }
    async create(inputData: CategoryCreateDto): Promise<CategoryModel> {
        return this.repository.create(inputData)
    }
}

export default new CategoryService(new PgCategoryRepository())