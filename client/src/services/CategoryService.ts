import { api } from "@/api"
import CategoryShort from "@/types/data/category/CategoryShort"

class CategoryService {
    private ROUTE_PREFIX: string = '/categories'

    async getCategories() {
        return (await api.get<CategoryShort[]>(this.ROUTE_PREFIX)).data
    }
}

export default new CategoryService()