import { TreeRepository } from "typeorm";

import CommentEntity from "../../../models/entity/postgre/CommentEntity";
import ICommentRepository from "../../ICommentRepository";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import { ApiError } from "../../../../utils/errors/ApiError";
import CommentInputDto from "../../../models/dto/comments/CommentInputDto";
import CommentModel from "../../../models/domain/Comment";
import CommentMapper from "../../../models/mappers/CommentMapper";
import CommentShortDto from "../../../models/dto/comments/CommentShortDto";
import { ReadableTypes, Condition }  from "../../../../utils/types/ReadableTypes";

class PgCommentRepository implements ICommentRepository {
    private commentRep: TreeRepository<CommentEntity>

    constructor() {
        this.commentRep = PgDataSource.getTreeRepository(CommentEntity)
    }

    async getComments(): Promise<CommentModel[]> {
        const entities = await this.commentRep.findTrees({
            relations: ['user', 'user.country']
        })

        return entities.map(entity => CommentMapper.toDataModel(entity))
    }
    async getCommentsByCondition(condition: Condition) {
        const entries = Object.entries(condition)[0]

        const entities = await this.commentRep.findTrees({
            relations: ['user', 'user.country', entries[0]]
        }).then(tree => tree.filter(el => 
            el[entries[0] as ReadableTypes] && el[entries[0] as ReadableTypes].id === entries[1]))

        return entities.map(com => CommentMapper.toDataModel(com))
    }
    async createPostComment(data: CommentInputDto): Promise<CommentShortDto> {
        const entity = this.commentRep.create({ 
            text: data.text,
            user: { id: data.userId },
            parent: { id: data.repliedToId?.valueOf() },
            post: { id: data.postId }
        })

        await this.commentRep.insert(entity)

        const preloadedEntity = await this.commentRep.preload({ id: entity.id })
        if (!preloadedEntity) {
            throw ApiError.NotFound("Comment addition was not successfull")
        }

        return CommentMapper.toShortDto(preloadedEntity)
    }
    async createThreadComment(data: CommentInputDto): Promise<CommentShortDto> {
        const entity = this.commentRep.create({ 
            text: data.text,
            user: { id: data.userId },
            parent: { id: data.repliedToId?.valueOf() },
            thread: { id: data.threadId }
        })

        await this.commentRep.insert(entity)

        const preloadedEntity = await this.commentRep.preload({ id: entity.id })
        if (!preloadedEntity) {
            throw ApiError.NotFound("Comment addition was not successfull")
        }

        return CommentMapper.toShortDto(preloadedEntity)
    }
    async delete(id: string): Promise<void> {
        const isEntityExist = this.commentRep.existsBy({ id })
        if (!isEntityExist) {
            throw ApiError.NotFound("This comment doesn't exist")
        }

        await this.commentRep.delete({ id })
    }
}

export default PgCommentRepository