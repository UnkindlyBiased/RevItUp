import PostModel from "../../domain/Post";

type PostUpdateDto = Pick<PostModel, "postTitle" | "previewText" | "text">

export default PostUpdateDto