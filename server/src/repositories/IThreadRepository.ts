import ThreadModel from "../models/domain/Thread";
import ThreadInputDto from "../models/dto/threads/ThreadInputDto";
import ThreadUpdateDto from "../models/dto/threads/ThreadUpdateDto";

export default interface IThreadRepository {
    getThreads: () => Promise<ThreadModel[]>
    getThreadByLink: (link: string) => Promise<ThreadModel>
    create: (input: ThreadInputDto) => Promise<ThreadModel>
    update: (input: ThreadUpdateDto) => Promise<ThreadModel>
    delete: (id: string) => Promise<void>
    registerView: (id: string) => Promise<void>
}