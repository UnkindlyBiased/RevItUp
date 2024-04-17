import UserShortDto from "../dto/users/UserShortDto"
import CommentModel from "./Comment"

export default interface PostModel {
    id: number
    postTitle: string
    previewText: string
    text: string
    imageLink: string
    creationDate: Date
    author: UserShortDto
    comments: CommentModel[]
}