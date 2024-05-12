import CommentModel from "../models/domain/Comment";
import CommentInputDto from "../models/dto/comments/CommentInputDto";
import CommentShortDto from "../models/dto/comments/CommentShortDto";
import ICommentRepository from "../repositories/ICommentRepository";
import PgCommentRepository from "../repositories/implemented/postgre/PgCommentRepository";

class CommentService {
    constructor(private repository: ICommentRepository) {}

    async getComments(): Promise<CommentModel[]> {
        return this.repository.getComments();
    }
    // TODO: add comments' retrieval from cache
    async getCommentsForPost(postId: string): Promise<CommentModel[]> {
        return this.repository.getCommentsForPost(postId)
    }
    // TODO: add removal of cached comments
    async create(data: CommentInputDto): Promise<CommentShortDto> {
        return this.repository.create(data)
    }
}

export default new CommentService(PgCommentRepository)