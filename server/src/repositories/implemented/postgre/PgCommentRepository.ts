import { Repository } from "typeorm";
import PostCommentEntity from "../../../models/entity/postgre/CommentEntity";
import ICommentRepository from "../../ICommentRepository";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import { ApiError } from "../../../../utils/errors/ApiError";
import CommentInputDto from "../../../models/dto/comments/CommentInputDto";
import CommentModel from "../../../models/domain/Comment";
import CommentMapper from "../../../models/mappers/CommentMapper";
import PgUserRepository from "./PgUserRepository";

class PgCommentRepository implements ICommentRepository {
    private commentRep: Repository<PostCommentEntity>

    constructor() {
        this.commentRep = PgDataSource.getRepository(PostCommentEntity)
    }

    // ! Too much data
    async getComments(): Promise<CommentModel[]> {
        const entities = await this.commentRep.find({
            relations: ['user', 'user.country', 'repliedTo'],
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
            throw ApiError.NotFound("No ID was not found")
        }

        const entities = await this.commentRep.find({
            where: {
                post: {
                    id: postId
                }
            },
            order: {
                creationDate: "ASC"
            }
        })

        return entities.map(entity => CommentMapper.toDataModel(entity))
    }
    async create(data: CommentInputDto): Promise<CommentModel> {
        const user = await PgUserRepository.getUserById(data.userId)
        const entity = this.commentRep.create({ 
            text: data.text,
            user: {
                id: data.userId,
                username: user.username,
                country: user.country
            },
            repliedTo: {
                id: data.repliedToId?.valueOf()
            },
            post: {
                id: data.postId
            }
        })

        await this.commentRep.insert(entity)
        return CommentMapper.toDataModel(entity)
    }
}

export default new PgCommentRepository()