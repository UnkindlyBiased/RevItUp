import Comment from "./Comment";

type CommentInput = Pick<Comment, "text" | "repliedTo"> & {
    userId: number
    postId?: string
}

export default CommentInput