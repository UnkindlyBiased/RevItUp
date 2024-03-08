import { Repository } from "typeorm"
import { PostEntity } from "../models/PostEntity"
import PgDataSource from "../../utils/AppDataSource"

class PostRepository {
    private postRep: Repository<PostEntity>

    constructor() {
        this.postRep = PgDataSource.getRepository(PostEntity)
    }

    async getPosts(): Promise<PostEntity[]> {
        const posts = await this.postRep.find({ order: {
            creationDate: 'DESC'
        } })
        return posts
    }
}

export default new PostRepository()