import CategoryService from "@/services/CategoryService";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getCategories()
})

const useGetCategoriesByPostsAmount = () => useQuery({
    queryKey: ['categories-by-posts'],
    queryFn: () => CategoryService.getCategoriesByPostsAmount()
})

const useGetCategoryByCode = (code: string) => useQuery({
    queryKey: ['category-detailed', code],
    queryFn: () => CategoryService.getCategoryByCode(code)
})

export {
    useGetCategories,
    useGetCategoriesByPostsAmount,
    useGetCategoryByCode
}