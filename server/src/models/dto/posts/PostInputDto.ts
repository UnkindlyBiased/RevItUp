export default interface PostInputDto {
    postTitle: string
    previewText: string
    text: string
    imageLink: string
    postLink?: string
    authorId: number
}