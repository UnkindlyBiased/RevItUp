import PostDetailed from "./PostDetailed";

type PostInput = Omit<PostDetailed, "id" | "author" | "category" | "creationDate" | "imageLink" | "views"> & { 
    categoryId: string,
    postImage?: FileList
}

export default PostInput