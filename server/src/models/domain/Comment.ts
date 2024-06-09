import UserShortDto from "../dto/users/UserShortDto"

export default interface CommentModel {
    id: string
    text: string
    user: UserShortDto,
    creationDate: Date,
    children: CommentModel[] | null
}