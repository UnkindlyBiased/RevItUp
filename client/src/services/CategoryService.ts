import { api } from "@/api"
import Category from "@/types/data/category/Category"
import CategoryShort from "@/types/data/category/CategoryShort"

class CategoryService {
    private ROUTE_PREFIX: string = '/categories'

    getCategories = async () => (await api.get<CategoryShort[]>(this.ROUTE_PREFIX)).data
    
    getCategoriesByPostsAmount = async () => (await api.get<CategoryShort[]>(this.ROUTE_PREFIX + '/sorted')).data

    async getCategoryByCode(code: string): Promise<Category> {
        return (await api.get<Category>(this.ROUTE_PREFIX + `/${code}`)).data
    }
}

export default new CategoryService()