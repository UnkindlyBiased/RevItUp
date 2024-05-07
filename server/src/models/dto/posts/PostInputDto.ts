import PostModel from "../../domain/Post";

type PostInputDto = Pick<PostModel, "postTitle" | "previewText" | "text" | "imageLink"> & {
    postLink?: string
    authorId: number
}

export default PostInputDto