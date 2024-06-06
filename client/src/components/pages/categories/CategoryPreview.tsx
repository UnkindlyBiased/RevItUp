import { Link } from "react-router-dom"

import CategoryShort from "@/types/data/category/CategoryShort"
import AppRoutes from "@/utils/enums/AppRoutes"

function CategoryPreview({ category }: { category: CategoryShort }): React.ReactElement {
    return (
        <div className="flex flex-col space-y-3">
            <img className="h-20 w-fit" src={category.logo} />
            <div style={{ backgroundColor: category.categoryColor }} className="h-[2px] w-[30%]" />
            <Link to={AppRoutes.OPENED_CATEGORY.replace(':code', category.categoryCode)} className="font-bold text-xl">
                {category.categoryName}
            </Link>
        </div>
    )
}

export default CategoryPreview