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
        const cachedComments = await cacheClient.get(`post-comments-${postId}`)
        if (cachedComments) {
            return JSON.parse(cachedComments) as CommentModel[]
        }

        const comments = await this.repository.getCommentsByCondition({ post: postId })
        await cacheClient.set(`post-comments-${postId}`, JSON.stringify(comments), { EX: 30 })

        return comments
    }
    async getCommentsForThread(threadId: string): Promise<CommentModel[]> {
        const cachedComments = await cacheClient.get(`thread-comments-${threadId}`)
        if (cachedComments) {
            return JSON.parse(cachedComments) as CommentModel[]
        }

        const comments = await this.repository.getCommentsByCondition({ thread : threadId })
        await cacheClient.set(`thread-comments-${threadId}`, JSON.stringify(comments), { EX: 30 })

        return comments
    }
    async createPostComment(data: CommentInputDto): Promise<CommentShortDto> {
        await cacheClient.del(`post-comments-${data.postId}`)
        return this.repository.createPostComment(data)
    }
    async createThreadComment(data: CommentInputDto): Promise<CommentShortDto> {
        await cacheClient.del(`thread-comments-${data.threadId}`)
        return this.repository.createThreadComment(data)
    }
    async delete(id: string): Promise<void> {
        this.repository.delete(id)
    }
}

export default CommentService