import Comment from "./Comment";

type CommentInput = Pick<Comment, "text"> & {
    userId: number
    postId?: string
    threadId?: string
}

export default CommentInput