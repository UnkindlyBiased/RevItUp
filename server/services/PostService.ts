import { Repository } from "typeorm";
import { PostEntity } from "../models/PostEntity.ts";
import PgDataSource from "../utils/PgDataSource.ts";

class PostService {
    private postRepository: Repository<PostEntity>

    constructor() {
        this.postRepository = PgDataSource.getRepository(PostEntity)
    }

    async getPosts() {
        const posts = await this.postRepository.find()
        return posts
    }
    async getPostById(id: number) {
        const post = await this.postRepository.findOneBy({
            id: id
        })
        return post
    }
    async addPost(post: PostEntity) {
        await this.postRepository.save(post)
        return post
    }
}

export default new PostService()