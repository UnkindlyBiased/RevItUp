import UserShort from "../users/UserShort"

type Thread = {
    id: string
    threadTitle: string
    threadText: string
    threadLink?: string
    creationDate: Date
    views: number
    author: UserShort
}

export default Thread