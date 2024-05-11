import CategoryModel from "../../domain/Category";

type CategoryCreateDto = Omit<CategoryModel, 'id'>

export default CategoryCreateDto