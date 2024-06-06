import UserShort from "../users/UserShort"
import ThreadCategory from "./categories/ThreadCategory"

type Thread = {
    id: string
    threadTitle: string
    threadText: string
    threadLink?: string
    creationDate: Date
    views: number
    author: UserShort
    threadCategory: ThreadCategory
}

export default Thread