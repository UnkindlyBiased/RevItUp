import { Repository } from "typeorm";
import PostCommentEntity from "../../../models/entity/postgre/CommentEntity";
import ICommentRepository from "../../ICommentRepository";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import { ApiError } from "../../../../utils/errors/ApiError";
import CommentInputDto from "../../../models/dto/comments/CommentInputDto";
import CommentModel from "../../../models/domain/Comment";
import CommentMapper from "../../../models/mappers/CommentMapper";
import CommentShortDto from "../../../models/dto/comments/CommentShortDto";

class PgCommentRepository implements ICommentRepository {
    private commentRep: Repository<PostCommentEntity>

    constructor() {
        this.commentRep = PgDataSource.getRepository(PostCommentEntity)
    }

    // ! Too much data
    async getComments(): Promise<CommentModel[]> {
        const entities = await this.commentRep.find({
            relations: ['user', 'user.country', 'repliedTo'],
            order: {
                creationDate: 'ASC'
            },
            select: {
                user: {
                    id: true,
                    username: true,
                    country: {
                        name: true,
                        flagImgLink: true
                    }
                },
                repliedTo: { id: true }
            }
        })
        if (!entities || !entities.length) {
            throw ApiError.NotFound("No comments for this post or thread were found")
        }

        return entities.map(entity => CommentMapper.toDataModel(entity))
    }
    async getCommentsForPost(postId: string) {
        if (!postId) {
            throw ApiError.NotFound("No ID was not provided")
        }

        const entities = await this.commentRep.find({
            where: { post: { id: postId } },
            relations: ['user', 'user.country', 'repliedTo'],
            order: { creationDate: 'ASC' }
        })

        return entities.map(entity => CommentMapper.toDataModel(entity))
    }
    async createPostComment(data: CommentInputDto): Promise<CommentShortDto> {
        const entity = this.commentRep.create({ 
            text: data.text,
            user: { id: data.userId },
            repliedTo: { id: data.repliedToId?.valueOf() },
            post: { id: data.postId }
        })

        await this.commentRep.insert(entity)

        const preloadedEntity = await this.commentRep.preload({ id: entity.id })
        if (!preloadedEntity) {
            throw ApiError.NotFound("Comment addition was not successfull")
        }

        return CommentMapper.toShortDto(preloadedEntity)
    }
}

export default new PgCommentRepository()