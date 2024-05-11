import CategoryService from "@/services/CategoryService";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getCategories()
})

export {
    useGetCategories
}