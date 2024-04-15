import SavedPostsModel from "../models/domain/SavedPosts";
import MongoSavedPostsRepository from "../repositories/implemented/mongo/MongoSavedPostsRepository";
import ISavedPostsRepository from "../repositories/ISavedPostsRepository";

class SaverService {
    constructor(private repository: ISavedPostsRepository) {}

    async create(userId: number): Promise<SavedPostsModel> {
        return await this.repository.create(userId)   
    }
}

export default new SaverService(MongoSavedPostsRepository)