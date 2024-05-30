import { FaArrowRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

import TopCategoryLink from "@/components/generic/category/TopCategoryLink"
import { useGetCategoriesByPostsAmount } from "@/hooks/useCategories"
import { useGetSchema } from "@/hooks/useColorMode"

function TopCategories(): React.ReactElement {
    const { data: topCategories } = useGetCategoriesByPostsAmount()
    const schema = useGetSchema()

    return (
        <div className={cn("flex size-fit px-6 py-3 rounded-lg text-white group items-center transition", schema.primaryBgColor)}>
            <div className="flex flex-col items-center space-y-4">
                <span className="font-bold text-3xl">Hottest categories</span>
                <div className="space-x-6 flex">
                    {topCategories?.map(category => (
                        <TopCategoryLink key={category.id} category={category} />
                    ))}
                </div>
            </div>
            <div className="flex w-0 jusitfy-center group-hover:px-4 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
                <Link to='/categories' className="font-bold">
                    <FaArrowRight size={26} />
                </Link>
            </div>
        </div>
    )
}

export default TopCategories