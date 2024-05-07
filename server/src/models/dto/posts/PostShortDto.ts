import PostModel from "../../domain/Post";

type PostShortDto = Pick<PostModel, "postTitle" | "postLink">

export default PostShortDto