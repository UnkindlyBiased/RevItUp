import { cacheClient } from "../../utils/data/RedisCacheClient";
import CommentModel from "../models/domain/Comment";
import CommentInputDto from "../models/dto/comments/CommentInputDto";
import CommentShortDto from "../models/dto/comments/CommentShortDto";
import ICommentRepository from "../repositories/ICommentRepository";

class CommentService {
    constructor(private repository: ICommentRepository) {}

    async getComments(): Promise<CommentModel[]> {
        return this.repository.getComments();
    }
    async getCommentsForPost(postId: string): Promise<CommentModel[]> {
        const cahcedComments = await cacheClient.get(`post-comments-${postId}`)
        if (cahcedComments) {
            return JSON.parse(cahcedComments) as CommentModel[]
        }

        const comments = await this.repository.getCommentsForPost(postId)
        await cacheClient.set(`post-comments-${postId}`, JSON.stringify(comments), { EX: 300 })

        return comments
    }
    async createPostComment(data: CommentInputDto): Promise<CommentShortDto> {
        await cacheClient.del(`post-comments-${data.postId}`)
        return this.repository.createPostComment(data)
    }
}

export default CommentService