import PostModel from "../models/domain/Post";
import PostShortDto from "../models/dto/posts/PostShortDto";
import PostMapper from "../models/mappers/PostMapper";
import PgPostRepository from "../repositories/implemented/postgre/PgPostRepository";
import IPostRepository from "../repositories/IPostRepository";

class PostService {
    constructor(private repository: IPostRepository) {}

    async getPosts(): Promise<PostShortDto[]> {
        const posts = await this.repository.getPosts()
        return posts.map(post => PostMapper.mapPostToPostShortDto(post))
    }
    async getPostById(id: number): Promise<PostModel> {
        const post = await this.repository.getPostById(id)
        return post
    }
    async delete(id: number): Promise<PostModel> {
        const post = await this.repository.delete(id)
        return post
    }
}

export default new PostService(PgPostRepository)