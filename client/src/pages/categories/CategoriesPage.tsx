import { useGetCategories } from "@/hooks/useCategories"
import CategoryPreview from "@/components/pages/categories/CategoryPreview"
import TwoLine from "@/components/generic/TwoLine"

function CategoriesPage() {
    const { data: categories } = useGetCategories()

    return (
        <div className="flex flex-col space-y-6">
            <TwoLine title="Categories" description="More like autosport universe" />
            <div className="grid grid-cols-3 gap-y-3">
                {categories?.map((cat, i) => (
                    <CategoryPreview key={i} category={cat} />
                ))}
            </div>
        </div>
    )
}

export default CategoriesPage