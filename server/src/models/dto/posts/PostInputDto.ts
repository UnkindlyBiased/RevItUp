import PostModel from "../../domain/Post";

type PostInputDto = Pick<PostModel, "postTitle" | "previewText" | "text" | "imageLink"> & {
    postLink?: string
    authorId: number
    categoryId: number
}

export default PostInputDto