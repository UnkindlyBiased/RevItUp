import { Suspense } from "react"

import CategoryShort from "@/types/data/category/CategoryShort"
import { Link } from "react-router-dom"

function TopCategoryLink({ category }: { category: CategoryShort }): React.ReactElement {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center bg-white bg-opacity-90 h-28 px-4 py-3 rounded-lg">
                <Suspense fallback={category.categoryCode}>
                    <img className="w-44 hover:w-52 h-max transition-all" src={category.categoryLogo} alt={category.categoryCode} />
                </Suspense>
            </div>
            <Link className="font-medium" to={`/category/${category.categoryCode}`}>
                {category.categoryName}
            </Link>
        </div>
    )
}

export default TopCategoryLink