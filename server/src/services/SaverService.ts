import SavedPostsModel from "../models/domain/SavedPosts";
import PostMapper from "../models/mappers/PostMapper";
import MongoSavedPostsRepository from "../repositories/implemented/mongo/MongoSavedPostsRepository";
import ISavedPostsRepository from "../repositories/ISavedPostsRepository";
import PostService from "./PostService";

class SaverService {
    constructor(private repository: ISavedPostsRepository) {}

    async getByUserId(userId: number) {
        const savedPostInfo = await this.repository.getByUserId(userId)
        const postsPromises = savedPostInfo.posts.map(async (post) => PostMapper.mapPostToPostPreviewDto(
            await PostService.getPostById(post)
        ))
        const posts = Promise.all(postsPromises)

        return posts
    }
    async create(userId: number): Promise<SavedPostsModel> {
        return await this.repository.create(userId)   
    }
    async delete(userId: number): Promise<SavedPostsModel> {
        return await this.repository.delete(userId)
    }
}

export default new SaverService(MongoSavedPostsRepository)