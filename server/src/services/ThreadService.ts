import ThreadModel from "../models/domain/Thread";
import ThreadInputDto from "../models/dto/threads/ThreadInputDto";
import IThreadRepository from "../repositories/IThreadRepository";
import ThreadHelper from '../../utils/helpers/ThreadHelper'
import ThreadUpdateDto from "../models/dto/threads/ThreadUpdateDto";
import ThreadMapper from "../models/mappers/ThreadMapper";
import ThreadShortDto from "../models/dto/threads/ThreadShortDto";
import ThreadLightModel from "../models/dto/threads/ThreadLightModel";
import DataFindOptions from "../../utils/types/DataFindOptions";

class ThreadService {
    constructor(private repository: IThreadRepository) {}

    async getThreads(options: DataFindOptions): Promise<ThreadShortDto[]> {
        const threads = await this.repository.getThreads(options);
        return threads.map(thread => ThreadMapper.toThreadShortDto(thread));
    }
    async getThreadByLink(link: string): Promise<ThreadModel> {
        const thread = await this.repository.getThreadByLink(link)
        
        return thread
    }
    async getPagesAmount(take: number, condition?: Record<string, any>): Promise<number> {
        return this.repository.getPagesAmount(take, condition)
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