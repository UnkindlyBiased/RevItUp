import { api } from "@/api"
import CategoryShort from "@/types/data/category/CategoryShort"

class CategoryService {
    private ROUTE_PREFIX: string = '/categories'

    getCategories = async () => (await api.get<CategoryShort[]>(this.ROUTE_PREFIX)).data
    
    getCategoriesByPostsAmount = async () => (await api.get<CategoryShort[]>(this.ROUTE_PREFIX + '/sorted')).data
}

export default new CategoryService()