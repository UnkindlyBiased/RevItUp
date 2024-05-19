import PostModel from "../../domain/Post";

type PostInputDto = Pick<PostModel, "postTitle" | "previewText" | "text" | "imageLink"> & {
    postLink?: string
    authorId: number
    categoryId: number
}

type PostInputWithImageDto = Omit<PostInputDto, | "imageLink"> & {
    image: Express.Multer.File
}

export { PostInputDto, PostInputWithImageDto }