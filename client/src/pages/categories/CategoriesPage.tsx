import MainTitle from "@/components/pages/posts/MainTitle"
import { useGetCategories } from "@/hooks/useCategories"
import { Suspense } from "react"
import { Link } from "react-router-dom"

function CategoriesPage() {
    const { data: categories } = useGetCategories()

    return (
        <div className="flex flex-col space-y-3">
            <MainTitle className="text-6xl">Categories</MainTitle>
            <div className="grid grid-cols-3 gap-y-3">
                {categories?.map((cat, i) => (
                    <Suspense key={i} fallback={<span>Loading</span>}>
                        <Link to={`/categories/${cat.categoryCode}`}>{cat.categoryName}</Link>
                    </Suspense>
                ))}
            </div>
        </div>
    )
}

export default CategoriesPage