import { Suspense } from "react"
import { Link } from "react-router-dom"

import CategoryShort from "@/types/data/category/CategoryShort"

function TopCategoryLink({ category }: { category: CategoryShort }): React.ReactElement {

    return (
        <Link to={`/categories/${category.categoryCode}`} className="flex flex-col space-y-2 items-center group transition">
            <div className="flex items-center h-32 w-40 bg-white bg-opacity-90 px-4 py-3 rounded-lg">
                <Suspense fallback={category.categoryCode}>
                    <img className="w-32 hover:w-36 h-max transition-all" src={category.categoryLogo} alt={category.categoryCode} />
                </Suspense>
            </div>
            <div className="w-40 opacity-0 h-0 group-hover:block group-hover:h-12 group-hover:opacity-100 transition-all">
                <span className="font-medium">
                    {category.categoryName}
                </span>
            </div>
        </Link>
    )
}

export default TopCategoryLink