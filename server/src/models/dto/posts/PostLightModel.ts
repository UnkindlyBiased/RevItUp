import PostModel from "../../domain/Post";

type PostLightModel = Omit<PostModel, "author" | "category">

export default PostLightModel