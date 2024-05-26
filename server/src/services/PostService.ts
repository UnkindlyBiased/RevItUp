import { cacheClient } from "../../utils/data/RedisCacheClient";
import FirebaseRefEndponts from "../../utils/enums/FirebaseRefEndpoints";
import PostHelper from "../../utils/helpers/PostHelper";
import DataFindOptions from "../../utils/types/DataFindOptions";
import PostModel from "../models/domain/Post";
import { PostInputWithImageDto }  from "../models/dto/posts/PostInputDto";
import PostLightModel from "../models/dto/posts/PostLightModel";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostShortDto from "../models/dto/posts/PostShortDto";
import PostUpdateDto from "../models/dto/posts/PostUpdateDto";
import PostMapper from "../models/mappers/PostMapper";
import PgPostRepository from "../repositories/implemented/postgre/PgPostRepository";
import IPostRepository from "../repositories/IPostRepository";
import FirebaseService from "./FirebaseService";

class PostService {
    constructor(private repository: IPostRepository) {}

    async getPosts(options: DataFindOptions): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPosts(options)
        return posts.map(post => PostMapper.mapPostToPostPreviewDto(post))
    }
    async getPostById(id: string): Promise<PostLightModel> {
        return this.repository.getPostById(id)
    }
    async getPostByLink(link: string): Promise<PostModel> {
        const cachedPostString = await cacheClient.get(`post-${link}`)
        if (cachedPostString) {
            return JSON.parse(cachedPostString) as PostModel
        }

        const post = await this.repository.getPostByLink(link)
        await cacheClient.set(`post-${link}`, JSON.stringify(post), { EX: 30 })

        return post
    }
    async getRandomPost(): Promise<PostShortDto> {
        const randomPost = await this.repository.getRandomPost()
        return PostMapper.mapPostToPostShortDto(randomPost)
    }
    async getPostsByCategoryCode(code: string, options: DataFindOptions): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPostsByCategoryCode(code, options)
        return posts.map(post => PostMapper.mapPostToPostPreviewDto(post))
    }
    async getPostsByAuthorship(authorId: number, options: DataFindOptions): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPostsByAuthorship(authorId, options)

        return posts.map(post => PostMapper.mapPostToPostPreviewDto(post))
    }
    async search(inputStr: string): Promise<PostPreviewDto[]> {
        const posts = await this.repository.search(inputStr)
        return posts.map(post => PostMapper.mapPostToPostPreviewDto(post))
    }
    async create(candidate: PostInputWithImageDto): Promise<PostLightModel> {
        candidate.postLink = PostHelper.putDashes(candidate.postTitle)

        const imageRef = await FirebaseService.uploadImage({
            image: candidate.image,
            imageName: candidate.postLink + '-' + Math.floor(Math.random() * 100000000),
            endpoint: FirebaseRefEndponts.POSTS
        })
        const imageLink = await FirebaseService.getDownloadUrl(imageRef)

        return this.repository.create({ ...candidate, imageLink })
    }
    async update(postId: string, input: PostUpdateDto): Promise<PostLightModel> {
        await cacheClient.del(`post-${input.postLink}`)
        
        input.postLink = PostHelper.putDashes(input.postTitle)
        if (input.image) {
            const imageRef = await FirebaseService.uploadImage({
                image: input.image,
                imageName: input.postLink + '-' + Math.floor(Math.random() * 100000000),
                endpoint: FirebaseRefEndponts.POSTS
            })
            const imageLink = await FirebaseService.getDownloadUrl(imageRef)
            input.imageLink = imageLink
        }

        PostHelper.trimPostData(input)

        return this.repository.update(postId, input)
    }
    async delete(id: string): Promise<PostLightModel> {
        return this.repository.delete(id)
    }
    async registerView(id: string): Promise<void> {
        await this.repository.registerView(id)
    }
}

export default new PostService(PgPostRepository)