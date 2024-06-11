import PostModel from "../../domain/Post";

type PostUpdateDto = Pick<PostModel, "postTitle" | "previewText" | "text" | "postLink"> & {
    userId?: number
    categoryId: number
    image?: Express.Multer.File
    imageLink?: string
}

export default PostUpdateDto