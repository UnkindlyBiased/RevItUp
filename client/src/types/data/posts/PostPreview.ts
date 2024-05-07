import PostDetailed from "./PostDetailed"

type PostPreview = Omit<PostDetailed, "text" | "creationDate" | "author"> & {
    postLink: string
}

export default PostPreview