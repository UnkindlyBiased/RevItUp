import CategoryModel from "../../domain/Category";

type CategoryShortDto = Omit<CategoryModel, "biography" | "categoryCreationDate">

export default CategoryShortDto