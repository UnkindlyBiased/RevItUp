import { api } from "@/api"
import ThreadCategory from "@/types/data/threads/categories/ThreadCategory"

class ThreadCategoryService {
    private ROUTE_PREFIX: string = '/thread-categories'

    async getThreadCategories(): Promise<ThreadCategory[]> {
        return (await api.get<ThreadCategory[]>(this.ROUTE_PREFIX)).data
    }
    async getThreadCategoryByCode(code: string): Promise<ThreadCategory> {
        return (await api.get<ThreadCategory>(this.ROUTE_PREFIX + `/${code}`)).data
    }
}

export default new ThreadCategoryService()