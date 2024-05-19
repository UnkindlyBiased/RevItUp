import PostDetailed from "./PostDetailed";

type PostInput = Omit<PostDetailed, "id" | "author" | "category" | "creationDate" | "imageLink"> & { 
    categoryId: string,
    postImage: FileList
}

export default PostInput