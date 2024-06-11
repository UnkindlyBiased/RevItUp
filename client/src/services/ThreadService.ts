import { api } from "@/api"
import PaginatedResponse from "@/types/data/default/PaginatedResponse"
import Thread from "@/types/data/threads/Thread"
import ThreadInput from "@/types/data/threads/ThreadInput"
import ThreadShort from "@/types/data/threads/ThreadShort"

class ThreadService {
    private ROUTE_PREFIX: string = '/threads'

    async getThreads(options?: string) {
        return (await api.get<PaginatedResponse & { threads: ThreadShort[] }>(
            this.ROUTE_PREFIX + `?${options}`)
        ).data
    }
    async getThreadByLink(link: string): Promise<Thread> {
        return (await api.get<Thread>(this.ROUTE_PREFIX + `/${link}`)).data
    }
    async getRecentThreads() {
        return (await api.get<PaginatedResponse & { threads: ThreadShort[] }>(this.ROUTE_PREFIX + '?page=1&take=10')).data
    }
    async create(input: ThreadInput): Promise<void> {
        await api.post(this.ROUTE_PREFIX, input)
    }
    async registerView(id: string): Promise<void> {
        await api.patch(this.ROUTE_PREFIX, { id })
    }
}

export default new ThreadService()