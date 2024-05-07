import CategoryModel from "../../domain/Category";

type CategoryShortDto = Pick<CategoryModel, "categoryName" | "categoryColor" | "categoryLogo" | "categoryCode">

export default CategoryShortDto