import Category from "./Category";

type CategoryShort = Omit<Category, "biography" | "creationDate">

export default CategoryShort