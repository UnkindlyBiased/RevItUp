import PostModel from "../../domain/Post";

type PostLightModel = Omit<PostModel, "author" | "creationDate">

export default PostLightModel