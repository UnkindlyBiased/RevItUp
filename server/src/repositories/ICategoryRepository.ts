import CategoryModel from "../models/domain/Category";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";
import CategoryShortDto from "../models/dto/categories/CategoryShortDto";

export default interface ICategoryRepository {
    getCategories: () => Promise<CategoryShortDto[]>
    getByCategoryCode: (code: string) => Promise<CategoryModel>
    create: (input: CategoryCreateDto) => Promise<CategoryModel>
    deleteByCategoryCode: (code: string) => Promise<CategoryModel>
}