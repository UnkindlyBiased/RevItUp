import UserModel from "./User"

export default interface CommentModel {
    id: number
    text: string
    user: UserModel,
    creationDate: Date,
    repliedToId: number | null
}