import SavedPostsModel from "../models/domain/SavedPosts";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostMapper from "../models/mappers/PostMapper";
import MongoSavedPostsRepository from "../repositories/implemented/mongo/MongoSavedPostsRepository";
import ISavedPostsRepository from "../repositories/ISavedPostsRepository";
import PostService from "./PostService";

class SaverService {
    constructor(private repository: ISavedPostsRepository) {}

    async getUserSavedPosts(userId: number): Promise<PostPreviewDto[]> {
        const savedPostInfo = await this.repository.getByUserId(userId)
        const postsPromises = savedPostInfo.posts.map(async (post) => PostMapper.mapPostToPostPreviewDto(
            await PostService.getPostById(post)
        ))
        const posts = Promise.all(postsPromises)

        return posts
    }
    async create(userId: number): Promise<SavedPostsModel> {
        return this.repository.create(userId)   
    }
    async savePost(postId: string, userId: number) {
        return this.repository.savePost(postId, userId)
    }
    async removePost(postId: string, userId: number) {
        return this.repository.removePost(postId, userId)
    }
}

export default new SaverService(MongoSavedPostsRepository)