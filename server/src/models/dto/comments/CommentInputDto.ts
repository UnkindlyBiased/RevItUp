export default interface CommentInputDto {
    text: string
    userId: number,
    repliedToId: string | null,
    postId?: string
    threadId?: string
}