import UserShort from "../users/UserShort"

type Comment = {
    id: string
    text: string
    user: UserShort
    creationDate: Date
    children: Comment[] | null
}

export default Comment