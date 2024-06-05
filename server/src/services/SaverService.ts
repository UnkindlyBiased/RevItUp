import SavedPostsModel from "../models/domain/SavedPosts";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostMapper from "../models/mappers/PostMapper";
import ISavedPostsRepository from "../repositories/ISavedPostsRepository";
import PgPostRepository from "../repositories/implemented/postgre/PgPostRepository";
import PostService from "./PostService";

class SaverService {
    private readonly postService: PostService

    constructor(private repository: ISavedPostsRepository) {
        this.postService = new PostService(new PgPostRepository())
    }

    getUserSavedPosts = async (userId: number): Promise<PostPreviewDto[]> => {
        const savedPostInfo = await this.repository.getByUserId(userId)
        const postsPromises = savedPostInfo.posts.map(async (post) => PostMapper.toPostPreviewDto(
            await this.postService.getPostById(post)
        ))

        return Promise.all(postsPromises)
    }
    async create(userId: number): Promise<SavedPostsModel> {
        return this.repository.create(userId)   
    }
    async savePost(postId: string, userId: number): Promise<SavedPostsModel> {
        return this.repository.savePost(postId, userId)
    }
    async removePost(postId: string, userId: number): Promise<SavedPostsModel> {
        return this.repository.removePost(postId, userId)
    }
    async checkIfSaved(postId: string, userId: number): Promise<boolean> {
        return this.repository.checkIfSaved(postId, userId)
    }
}

export default SaverService