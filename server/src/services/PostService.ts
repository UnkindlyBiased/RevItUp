import PostHelper from "../../utils/helpers/PostHelper";
import PostModel from "../models/domain/Post";
import PostInputDto from "../models/dto/posts/PostInputDto";
import PostLightModel from "../models/dto/posts/PostLightModel";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostShortDto from "../models/dto/posts/PostShortDto";
import PostUpdateDto from "../models/dto/posts/PostUpdateDto";
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
        candidate.postLink = PostHelper.putDashes(candidate.postTitle)

        return await this.repository.create(candidate)
    }
    async update(postId: number, input: PostUpdateDto): Promise<PostLightModel> {
        PostHelper.trimPostData(input)

        const updatedPost = await this.repository.update(postId, input)
        return updatedPost
    }
    async delete(id: number): Promise<PostModel> {
        const post = await this.repository.delete(id)
        return post
    }
}

export default new PostService(PgPostRepository)