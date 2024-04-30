import PostPreview from "./PostPreview";

type PostShort = Pick<PostPreview, "postTitle" | "postLink">

export default PostShort