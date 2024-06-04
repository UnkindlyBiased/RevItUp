import { useParams } from "react-router-dom"

import Loading from "@/components/generic/misc/Loading"
import { useGetCategoryByCode } from "@/hooks/useCategories"

function CategoryDetailedPage(): React.ReactNode {
    const { code } = useParams()
    const { data: categoryData, isLoading, isError } = useGetCategoryByCode(code || '')

    if (isLoading) return <Loading />

    if (!categoryData || isError) return <p>Error</p>

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-3 items-center">
                <img className="w-40" src={categoryData.logo} />
                <div className="w-[1px] h-12" style={{ backgroundColor: categoryData.categoryColor }} />
                <div className="flex flex-col space-y-1">
                    <span className="text-5xl font-bold">{categoryData.categoryName}</span>
                    <span>Creation date: {categoryData.creationDate}</span>
                </div>
            </div>
            <div className="flex flex-col w-60">
                <span className="text-3xl font-bold">Biography</span>
                <span className="break-words">{categoryData.biography}</span>
            </div>
        </div>
    )
}

export default CategoryDetailedPage