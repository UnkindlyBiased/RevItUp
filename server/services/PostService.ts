import { Repository } from "typeorm";
import { PostEntity } from "../models/PostEntity.ts";
import PgDataSource from "../utils/PgDataSource.ts";

class PostService {
    private postRepository: Repository<PostEntity>

    constructor() {
        this.postRepository = PgDataSource.getRepository(PostEntity)
    }

    async getUsers() {
        const users = await this.postRepository.find()
        return users
    }
}

export default new PostService()