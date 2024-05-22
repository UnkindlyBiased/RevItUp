import { Suspense } from "react"
import { Link } from "react-router-dom"

import CategoryShort from "@/types/data/category/CategoryShort"

function TopCategoryLink({ category }: { category: CategoryShort }): React.ReactElement {
    return (
        <Link to={`/categories/${category.categoryCode}`} className="flex flex-col items-center space-y-2">
            <div className="flex items-center bg-white bg-opacity-90 h-28 px-4 py-3 rounded-lg">
                <Suspense fallback={category.categoryCode}>
                    <img className="w-24 hover:w-28 h-max transition-all" src={category.categoryLogo} alt={category.categoryCode} />
                </Suspense>
            </div>
            <div className="flex justify-center w-48">
                <span className="font-medium break-words">
                    {category.categoryName}
                </span>
            </div>
        </Link>
    )
}

export default TopCategoryLink