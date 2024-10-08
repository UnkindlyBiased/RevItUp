import FirebaseRefEndponts from "../../utils/enums/FirebaseRefEndpoints";
import PostThreadHelper from "../../utils/helpers/PostHelper";
import DataFindOptions from "../../utils/types/DataFindOptions";
import PostModel from "../models/domain/Post";
import { PostInputWithImageDto }  from "../models/dto/posts/PostInputDto";
import PostLightModel from "../models/dto/posts/PostLightModel";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostShortDto from "../models/dto/posts/PostShortDto";
import PostUpdateDto from "../models/dto/posts/PostUpdateDto";
import PostMapper from "../models/mappers/PostMapper";
import IPostRepository from "../repositories/IPostRepository";
import FirebaseService from "./FirebaseService";

class PostService {
    private readonly firebaseService: FirebaseService
    
    constructor(private repository: IPostRepository) {
        this.firebaseService = new FirebaseService()
    }

    async getPosts(options: DataFindOptions): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPosts(options)
        return posts.map(post => PostMapper.toPostPreviewDto(post))
    }
    async getPostById(id: string): Promise<PostLightModel> {
        return this.repository.getPostById(id)
    }
    async getPostByLink(link: string): Promise<PostModel> {
        const post = await this.repository.getPostByLink(link)

        return post
    }
    async getRandomPost(): Promise<PostShortDto> {
        const randomPost = await this.repository.getRandomPost()
        return PostMapper.toPostShortDto(randomPost)
    }
    async getPostsByCategoryCode(code: string, options: DataFindOptions): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPostsByCategoryCode(code, options)
        return posts.map(post => PostMapper.toPostPreviewDto(post))
    }
    async getPostsByAuthorship(authorId: number): Promise<PostPreviewDto[]> {
        const posts = await this.repository.getPostsByAuthorship(authorId)

        return posts.map(post => PostMapper.toPostPreviewDto(post))
    }
    async getPagesAmount(take: number, condition?: Record<string, any>) {
        return this.repository.getPagesAmount(take, condition)
    }
    async search(inputStr: string, options: DataFindOptions): Promise<PostPreviewDto[]> {
        const posts = await this.repository.search(inputStr, options)
        return posts.map(post => PostMapper.toPostPreviewDto(post))
    }
    create = async (candidate: PostInputWithImageDto): Promise<PostLightModel> => {
        candidate.postLink = PostThreadHelper.putDashes(candidate.postTitle)

        const imageRef = await this.firebaseService.uploadImage({
            image: candidate.image,
            imageName: candidate.postLink + '-' + Math.floor(Math.random() * 100000000),
            endpoint: FirebaseRefEndponts.POSTS
        })
        const imageLink = await this.firebaseService.getDownloadUrl(imageRef)

        return this.repository.create({ ...candidate, imageLink })
    }
    update = async (postId: string, input: PostUpdateDto): Promise<PostLightModel> => {
        input.postLink = PostThreadHelper.putDashes(input.postTitle)
        if (input.image) {
            const imageRef = await this.firebaseService.uploadImage({
                image: input.image,
                imageName: input.postLink + '-' + Math.floor(Math.random() * 100000000),
                endpoint: FirebaseRefEndponts.POSTS
            })
            const imageLink = await this.firebaseService.getDownloadUrl(imageRef)
            input.imageLink = imageLink
        }

        PostThreadHelper.trimPostData(input)

        return this.repository.update(postId, input)
    }
    async delete(id: string): Promise<PostLightModel> {
        return this.repository.delete(id)
    }
    async registerView(id: string): Promise<void> {
        this.repository.registerView(id)
    }
    async checkIfExistsByTitle(title: string): Promise<boolean> {
        return this.repository.checkIfExistsByTitle(title)
    }
}

export default PostService