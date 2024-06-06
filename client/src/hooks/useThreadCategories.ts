import { useQuery } from "@tanstack/react-query";

import ThreadCategoryService from "@/services/ThreadCategoryService";

const useGetThreadCategories = () => useQuery({
    queryKey: ['thread-categories'],
    queryFn: () => ThreadCategoryService.getThreadCategories()
})

export {
    useGetThreadCategories
}