import CommentModel from "../../domain/Comment";

type CommentShortDto = Omit<CommentModel, "repliedToId" | "user">

export default CommentShortDto