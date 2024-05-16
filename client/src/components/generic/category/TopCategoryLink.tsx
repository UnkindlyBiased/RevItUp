import { Suspense } from "react"
import { Link } from "react-router-dom"

import CategoryShort from "@/types/data/category/CategoryShort"

function TopCategoryLink({ category }: { category: CategoryShort }): React.ReactElement {
    return (
        <Link to={`/category/${category.categoryCode}`} className="flex flex-col items-center space-y-2">
            <div className="flex items-center bg-white bg-opacity-90 h-28 px-4 py-3 rounded-lg">
                 <Suspense fallback={category.categoryCode}>
                     <img className="w-44 hover:w-52 h-max transition-all" src={category.categoryLogo} alt={category.categoryCode} />
                </Suspense>
            </div>
            <span className="font-medium">
                {category.categoryName}
            </span>
        </Link>
    )
}

export default TopCategoryLink