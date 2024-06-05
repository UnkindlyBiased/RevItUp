import { cacheClient } from "../../utils/data/RedisCacheClient";
import ThreadModel from "../models/domain/Thread";
import ThreadInputDto from "../models/dto/threads/ThreadInputDto";
import IThreadRepository from "../repositories/IThreadRepository";
import ThreadHelper from '../../utils/helpers/ThreadHelper'
import ThreadUpdateDto from "../models/dto/threads/ThreadUpdateDto";
import ThreadMapper from "../models/mappers/ThreadMapper";
import ThreadShortDto from "../models/dto/threads/ThreadShortDto";
import ThreadLightModel from "../models/dto/threads/ThreadLightModel";

class ThreadService {
    constructor(private repository: IThreadRepository) {}

    async getThreads(): Promise<ThreadShortDto[]> {
        const threads = await this.repository.getThreads();
        return threads.map(thread => ThreadMapper.toThreadShortDto(thread));
    }
    async getThreadByLink(link: string): Promise<ThreadModel> {
        const cachedThread = await cacheClient.get(`thread-${link}`)
        if (cachedThread) {
            return JSON.parse(cachedThread) as ThreadModel
        }

        const thread = await this.repository.getThreadByLink(link)
        await cacheClient.set(`thread-${link}`, JSON.stringify(thread), { EX: 30 })
        
        return thread
    }
    async create(input: ThreadInputDto): Promise<ThreadLightModel> {
        ThreadHelper.trimData(input)
        input.threadLink = ThreadHelper.putDashes(input.threadTitle)

        return this.repository.create(input)
    }
    async update(input: ThreadUpdateDto): Promise<ThreadLightModel> {
        ThreadHelper.trimData(input)
        input.threadLink = ThreadHelper.putDashes(input.threadTitle)

        return this.repository.update(input)
    }
    async delete(id: string): Promise<void> {
        this.repository.delete(id)
    }
    async registerView(id: string): Promise<void> {
        this.repository.registerView(id)
    }
}

export default ThreadService