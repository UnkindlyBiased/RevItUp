import Category from "./Category";

type CategoryShort = Omit<Category, "biography" | "categoryCreationDate">

export default CategoryShort