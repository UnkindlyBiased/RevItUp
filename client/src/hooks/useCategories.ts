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

export {
    useGetCategories,
    useGetCategoriesByPostsAmount
}