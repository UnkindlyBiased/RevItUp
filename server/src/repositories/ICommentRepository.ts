import CommentModel from "../models/domain/Comment";
import CommentInputDto from "../models/dto/comments/CommentInputDto";
import CommentShortDto from "../models/dto/comments/CommentShortDto";
import { Condition } from '../../utils/types/ReadableTypes'

export default interface ICommentRepository {
    getComments: () => Promise<CommentModel[]>
    getCommentsByCondition: (condition: Condition) => Promise<CommentModel[]>
    createPostComment: (data: CommentInputDto) => Promise<CommentShortDto>
    createThreadComment: (data: CommentInputDto) => Promise<CommentShortDto>
    delete: (id: string) => Promise<void>
}