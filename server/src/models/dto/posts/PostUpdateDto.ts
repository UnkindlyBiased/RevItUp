import PostModel from "../../domain/Post";

type PostUpdateDto = Pick<PostModel, "postTitle" | "previewText" | "text" | "imageLink" | "postLink"> & {
    userId: number
    categoryId: number
}

export default PostUpdateDto