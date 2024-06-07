import { api } from "@/api"
import PaginatedResponse from "@/types/data/default/PaginatedResponse"
import ThreadShort from "@/types/data/threads/ThreadShort"

class ThreadService {
    private ROUTE_PREFIX: string = '/threads'

    async getThreads(options?: string) {
        return (await api.get<PaginatedResponse & { threads: ThreadShort[] }>(this.ROUTE_PREFIX + `?${options}`)).data
    }
}

export default new ThreadService()