import Category from "./Category";

type CategoryShort = Pick<Category, "categoryName" | "categoryColor" | "categoryLogo" | "categoryCode">

export default CategoryShort