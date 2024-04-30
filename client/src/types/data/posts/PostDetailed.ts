import UserShort from "../users/UserShort"

type PostDetailed = {
    id: string
    postTitle: string
    previewText: string
    text: string
    imageLink: string
    creationDate: Date,
    author: UserShort
}

export default PostDetailed