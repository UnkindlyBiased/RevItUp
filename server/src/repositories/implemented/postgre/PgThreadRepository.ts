import { Repository } from "typeorm";

import ThreadModel from "../../../models/domain/Thread";
import IThreadRepository from "../../IThreadRepository";
import ThreadEntity from "../../../models/entity/postgre/ThreadEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import ThreadMapper from "../../../models/mappers/ThreadMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import ThreadInputDto from "../../../models/dto/threads/ThreadInputDto";
import ThreadUpdateDto from "../../../models/dto/threads/ThreadUpdateDto";
import ThreadLightModel from "../../../models/dto/threads/ThreadLightModel";

class PgThreadRepository implements IThreadRepository {
    private threadRep: Repository<ThreadEntity>

    constructor() {
        this.threadRep = PgDataSource.getRepository(ThreadEntity)
    }

    async getThreads(): Promise<ThreadModel[]> {
        const entities = await this.threadRep.find({
            relations: ['author', 'author.country']
        })
        return entities.map(thread => ThreadMapper.toDataModel(thread))
    }
    async getThreadByLink(link: string): Promise<ThreadModel> {
        const entity = await this.threadRep.findOne({
            where: { threadLink: link },
            relations: ['author', 'author.country']
        })
        if (!entity) {
            throw ApiError.NotFound('Thread with such link was not found')
        }

        return ThreadMapper.toDataModel(entity)
    }
    async create(input: ThreadInputDto): Promise<ThreadLightModel> {
        const candidate = await this.threadRep.findOne({
            where: [
                { threadTitle: input.threadLink },
                { threadLink: input.threadLink },
            ]
        })
        if (candidate) {
            throw ApiError.Conflict('Thread with this data already exists')
        }

        const entity = this.threadRep.create({
            ...input,
            author: { id: input.authorId }
        })
        await this.threadRep.insert(entity)

        const preloaded = await this.threadRep.preload(entity)

        if (!preloaded) {
            throw ApiError.NotFound("Such thread doesn't exist")
        }

        return ThreadMapper.toLigthDataModel(preloaded)
    }
    async update(input: ThreadUpdateDto): Promise<ThreadLightModel> {
        const candidate = await this.threadRep.findOne({
            where: { id: input.id },
            select: { id: true }
        })
        if (!candidate) {
            throw ApiError.NotFound('Thread with such ID was not found')
        }

        delete input.authorId
        await this.threadRep.update(input.id, input)

        const entity = await this.threadRep.preload(input)
        if (!entity) {
            throw ApiError.NotFound("Such thread doesn't exist")
        }

        return ThreadMapper.toLigthDataModel(entity)
    }
    async delete(id: string): Promise<void> {
        const entity = await this.threadRep.findOne({
            where: { id },
            select: { id: true }
        })
        if (!entity) {
            throw ApiError.NotFound("The thread you want to delete doesn't exist")
        }

        await this.threadRep.remove(entity)
    }
    async registerView(id: string): Promise<void> {
        const entity = await this.threadRep.findOne({
            where: { id },
            select: { id: true, views: true }
        })
        if (!entity) {
            throw ApiError.NotFound('Thread with such ID was not found')
        }

        await this.threadRep.update(id, { views: ++entity.views })
    }
}

export default PgThreadRepository