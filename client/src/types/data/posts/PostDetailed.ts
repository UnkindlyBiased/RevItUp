import CategoryShort from "../category/CategoryShort"
import UserShort from "../users/UserShort"

type PostDetailed = {
    id: string
    postTitle: string
    previewText: string
    text: string
    postLink: string
    imageLink: string
    creationDate: Date
    views: number
    author: UserShort
    category: CategoryShort
}

export default PostDetailed