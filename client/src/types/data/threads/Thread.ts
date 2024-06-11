import UserShort from "../users/UserShort"
import ThreadCategoryShort from "./categories/ThreadCategoryShort"

type Thread = {
    id: string
    threadTitle: string
    threadText: string
    threadLink: string
    creationDate: Date
    views: number
    author: UserShort
    threadCategory: ThreadCategoryShort
}

export default Thread