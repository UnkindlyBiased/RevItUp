import { Repository } from "typeorm"
import { PostEntity } from "../models/PostEntity"
import PgDataSource from "../../utils/AppDataSource"
import PostCreateDto from "../models/dto/posts/PostCreateDto"
import { ApiError } from "../../utils/ApiError"
import PostPreviewDto from "../models/dto/posts/PostPreviewDto"

class PostRepository {
    private readonly postRep: Repository<PostEntity>

    constructor() {
        this.postRep = PgDataSource.getRepository(PostEntity)
    }

    async getPosts(): Promise<PostPreviewDto[]> {
        const posts = await this.postRep.find({
            order: {
                id: "DESC"
            }
        })
        return posts
    }
    async create(candidate: PostCreateDto): Promise<PostEntity> {
        const post = await this.postRep.findOneBy({
            postTitle: candidate.postTitle
        })
        if (post) {
            throw ApiError.Conflict("Post with this title already exists")
        }
        const newPost = this.postRep.create(candidate)
        return await this.postRep.save(newPost)
    }
}

export default new PostRepository()