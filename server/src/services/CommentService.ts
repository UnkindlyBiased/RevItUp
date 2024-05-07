import { cacheClient } from "../../utils/data/RedisCacheClient";
import CommentModel from "../models/domain/Comment";
import CommentInputDto from "../models/dto/comments/CommentInputDto";
import ICommentRepository from "../repositories/ICommentRepository";
import PgCommentRepository from "../repositories/implemented/postgre/PgCommentRepository";

class CommentService {
    constructor(private repository: ICommentRepository) {}

    async getComments(): Promise<CommentModel[]> {
        const comments = await this.repository.getComments();
        await cacheClient.set('comments-test', JSON.stringify(comments), { EX: 60 * 5 })

        return comments
    }
    async getCommentsForPost(postId: string): Promise<CommentModel[]> {
        const postComments = await this.repository.getCommentsForPost(postId)
        return postComments
    }
    async create(data: CommentInputDto): Promise<CommentModel> {
        const comment = await this.repository.create(data)
        return comment
    }
}

export default new CommentService(PgCommentRepository)