import CategoryModel from "../../domain/Category";

type CategoryShortDto = Omit<CategoryModel, "biography" | "сreationDate">

export default CategoryShortDto