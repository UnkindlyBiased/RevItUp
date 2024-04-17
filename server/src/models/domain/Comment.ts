import UserShortDto from "../dto/users/UserShortDto"

export default interface CommentModel {
    id: number
    text: string
    user: UserShortDto,
    creationDate: Date,
    repliedToId: number | null
}