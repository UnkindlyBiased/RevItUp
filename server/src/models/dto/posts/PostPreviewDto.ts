import PostModel from "../../domain/Post"

type PostPreivewDto = Omit<PostModel, "creationDate" | "author" | "text">

export default PostPreivewDto