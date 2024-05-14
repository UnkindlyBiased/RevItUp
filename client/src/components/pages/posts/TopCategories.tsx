import TopCategoryLink from "@/components/generic/category/TopCategoryLink"
import { useGetCategoriesByPostsAmount } from "@/hooks/useCategories"
import { useGetSchema } from "@/hooks/useColorMode"
import { cn } from "@/lib/utils"

function TopCategories(): React.ReactElement {
    const { data: topCategories } = useGetCategoriesByPostsAmount()
    const schema = useGetSchema()

    return (
        <div className={cn("flex flex-col px-8 py-3 rounded-lg text-white items-center space-y-4", schema.primaryBgColor)}>
            <span className="font-bold text-3xl">Hottest categories 🔥🔥🔥</span>
            <div className="space-x-5 flex">
                {topCategories?.map(category => (
                    <TopCategoryLink category={category} />
                ))}
            </div>
        </div>
    )
}

export default TopCategories