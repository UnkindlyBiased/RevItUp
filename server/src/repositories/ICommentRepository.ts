import CommentModel from "../models/domain/Comment";
import CommentInputDto from "../models/dto/comments/CommentInputDto";
import CommentShortDto from "../models/dto/comments/CommentShortDto";

export default interface ICommentRepository {
    getComments: () => Promise<CommentModel[]>
    getCommentsForPost: (postId: string) => Promise<CommentModel[]>
    createPostComment: (data: CommentInputDto) => Promise<CommentShortDto>
}