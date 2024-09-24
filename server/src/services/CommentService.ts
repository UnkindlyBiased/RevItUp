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
        const comments = await this.repository.getCommentsByCondition({ post: postId })

        return comments
    }
    async getCommentsForThread(threadId: string): Promise<CommentModel[]> {
        const comments = await this.repository.getCommentsByCondition({ thread : threadId })

        return comments
    }
    async createPostComment(data: CommentInputDto): Promise<CommentShortDto> {
        return this.repository.createPostComment(data)
    }
    async createThreadComment(data: CommentInputDto): Promise<CommentShortDto> {
        return this.repository.createThreadComment(data)
    }
    async delete(id: string): Promise<void> {
        this.repository.delete(id)
    }
}

export default CommentService