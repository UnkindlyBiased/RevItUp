import PostModel from "../models/domain/Post";
import PostInputDto from "../models/dto/posts/PostInputDto";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostShortDto from "../models/dto/posts/PostShortDto";
import PostMapper from "../models/mappers/PostMapper";
import PgPostRepository from "../repositories/implemented/postgre/PgPostRepository";
import IPostRepository from "../repositories/IPostRepository";

class PostService {
    constructor(private repository: IPostRepository) {}

    async getPosts(): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPosts()
        return posts.map(post => PostMapper.mapPostToPostPreviewDto(post))
    }
    async getPostById(id: number): Promise<PostModel> {
        const post = await this.repository.getPostById(id)
        return post
    }
    async getPostByLink(link: string): Promise<PostPreviewDto> {
        const post = await this.repository.getPostByLink(link)
        return post
    }
    async getRandomPost(): Promise<PostShortDto> {
        const randomPost = await this.repository.getRandomPost()
        return PostMapper.mapPostToPostShortDto(randomPost)
    }
    async create(candidate: PostInputDto): Promise<PostModel> {
        const symbols = "!:,\"".split("")
        let splittedTitle = candidate.postTitle

        for (const symbol of symbols) {
            splittedTitle = splittedTitle.replace(symbol, "")
        }
        candidate.postLink = splittedTitle.toLowerCase().split(" ").join('-')

        return await this.repository.create(candidate)
    }
    async delete(id: number): Promise<PostModel> {
        const post = await this.repository.delete(id)
        return post
    }
}

export default new PostService(PgPostRepository)