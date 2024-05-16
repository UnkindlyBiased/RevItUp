import CategoryModel from "../models/domain/Category";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";
import CategoryShortDto from "../models/dto/categories/CategoryShortDto";
import CategoryMapper from "../models/mappers/CategoryMapper";
import ICategoryRepository from "../repositories/ICategoryRepository";
import PgCategoryRepository from "../repositories/implemented/postgre/PgCategoryRepository";

class CategoryService {
    constructor(private repository: ICategoryRepository) {}

    async getCategories(): Promise<CategoryShortDto[]> {
        const categories = await this.repository.getCategories();
        return categories.map(category => CategoryMapper.mapModelToCategoryShortDto(category));
    }
    async getByCategoryCode(code: string): Promise<CategoryModel> {
        return this.repository.getByCategoryCode(code)
    }
    async getCategoriesByPostsLengthSorted(): Promise<CategoryShortDto[]> {
        const categories = await this.repository.getCategoriesByPostsLengthSorted()
        return categories.map(category => CategoryMapper.mapModelToCategoryShortDto(category))
    }
    async create(inputData: CategoryCreateDto): Promise<CategoryModel> {
        return this.repository.create(inputData)
    }
}

export default new CategoryService(new PgCategoryRepository())