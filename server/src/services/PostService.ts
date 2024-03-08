import { PostEntity } from "../models/PostEntity";
import PostRepository from "../repositories/PostRepository";

class PostService {
    async getPosts(): Promise<PostEntity[]> {
        const posts = PostRepository.getPosts()
        return posts
    }
}

export default new PostService()