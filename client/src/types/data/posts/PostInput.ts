import PostDetailed from "./PostDetailed";

type PostInput = Omit<PostDetailed, "id" | "author" | "category" | "creationDate"> & { categoryId: number }

export default PostInput