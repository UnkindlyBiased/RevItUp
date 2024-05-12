import PostDetailed from "./PostDetailed";

type PostInput = Omit<PostDetailed, "id" | "author" | "category" | "creationDate"> & { categoryId: string }

export default PostInput