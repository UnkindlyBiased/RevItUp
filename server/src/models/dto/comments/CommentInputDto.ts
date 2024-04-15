export default interface CommentInputDto {
    text: string
    userId: number,
    repliedToId: number | null
}