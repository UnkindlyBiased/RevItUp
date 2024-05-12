import CategoryModel from "../models/domain/Category";
import CategoryCreateDto from "../models/dto/categories/CategoryCreateDto";

export default interface ICategoryRepository {
    getCategories: () => Promise<CategoryModel[]>
    getByCategoryCode: (code: string) => Promise<CategoryModel>
    create: (input: CategoryCreateDto) => Promise<CategoryModel>
    deleteByCategoryCode: (code: string) => Promise<CategoryModel>
}