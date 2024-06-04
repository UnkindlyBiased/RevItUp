import CategoryShort from "@/types/data/category/CategoryShort"
import { Link } from "react-router-dom"

function CategoryPreview({ category }: { category: CategoryShort }): React.ReactElement {
    return (
        <div className="flex flex-col space-y-3">
            <img className="h-20 w-fit" src={category.logo} />
            <div style={{ backgroundColor: category.categoryColor }} className="h-[2px] w-[30%]" />
            <Link to={`/categories/${category.categoryCode}`} className="font-bold text-xl">
                {category.categoryName}
            </Link>
        </div>
    )
}

export default CategoryPreview