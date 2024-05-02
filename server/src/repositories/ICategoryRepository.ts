import CategoryModel from "../models/domain/Category";

export default interface ICategoryRepository {
    getCategories: () => Promise<CategoryModel[]>
    getByCategoryCode: (code: string) => Promise<CategoryModel>
    deleteByCategoryCode: (code: string) => Promise<CategoryModel>
}