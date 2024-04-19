import UserShort from "../users/UserShort"

type Comment = {
    id: number
    text: string
    user: UserShort
    creationDate: Date
    repliedTo: number | null
}

export default Comment