import CommentModel from "../models/domain/Comment";
import CommentInputDto from "../models/dto/comments/CommentInputDto";

export default interface ICommentRepository {
    getComments: () => Promise<CommentModel[]>
    getCommentsForPost: (postId: string) => Promise<CommentModel[]>
    create: (data: CommentInputDto) => Promise<CommentModel>
}