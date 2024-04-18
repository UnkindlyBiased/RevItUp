import UserShort from "../users/UserShort"

type PostDetailed = {
    id: number
    postTitle: string
    previewText: string
    text: string
    imageLink: string
    creationDate: Date,
    author: UserShort
}

export default PostDetailed