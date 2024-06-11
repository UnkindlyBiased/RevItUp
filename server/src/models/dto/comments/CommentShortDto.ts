import CommentModel from "../../domain/Comment";

type CommentShortDto = Omit<CommentModel, "user">

export default CommentShortDto