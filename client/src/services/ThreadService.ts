import { api } from "@/api"
import ThreadShort from "@/types/data/threads/ThreadShort"

class ThreadService {
    private ROUTE_PREFIX: string = '/threads'

    async getThreads() {
        return (await api.get<{ threads: ThreadShort[] }>(this.ROUTE_PREFIX)).data
    }
}

export default new ThreadService()