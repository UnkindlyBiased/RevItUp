import { Repository } from "typeorm";
import CommentEntity from "../../../models/entity/postgre/CommentEntity";
import ICommentRepository from "../../ICommentRepository";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import { ApiError } from "../../../../utils/errors/ApiError";
import CommentInputDto from "../../../models/dto/comments/CommentInputDto";
import CommentModel from "../../../models/domain/Comment";
import CommentMapper from "../../../models/mappers/CommentMapper";

class PgCommentRepository implements ICommentRepository {
    private commentRep: Repository<CommentEntity>

    constructor() {
        this.commentRep = PgDataSource.getRepository(CommentEntity)
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

    async create(data: CommentInputDto): Promise<CommentModel> {
        const entity = this.commentRep.create({ 
            text: data.text,
            user: {
                id: data.userId
            },
            repliedTo: {
                id: data.repliedToId?.valueOf()
            }
        })

        await this.commentRep.insert(entity)
        return CommentMapper.toDataModel(entity)
    }
}

export default new PgCommentRepository()