import DataFindOptions from "../../utils/types/DataFindOptions";
import ThreadModel from "../models/domain/Thread";
import ThreadInputDto from "../models/dto/threads/ThreadInputDto";
import ThreadLightModel from "../models/dto/threads/ThreadLightModel";
import ThreadUpdateDto from "../models/dto/threads/ThreadUpdateDto";

export default interface IThreadRepository {
    getThreads: (options: DataFindOptions) => Promise<ThreadModel[]>
    getThreadByLink: (link: string) => Promise<ThreadModel>
    getPagesAmount: (take: number, condition?: Record<string, any>) => Promise<number>
    create: (input: ThreadInputDto) => Promise<ThreadLightModel>
    update: (input: ThreadUpdateDto) => Promise<ThreadLightModel>
    delete: (id: string) => Promise<void>
    registerView: (id: string) => Promise<void>
}