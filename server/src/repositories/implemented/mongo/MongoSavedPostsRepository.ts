import { MongoRepository } from "typeorm";
import { MongoDataSource } from "../../../../utils/data/AppDataSource";
import SavedPostsEntity from "../../../models/entity/mongo/SavedPostsEntity";
import SavedPostsMapper from "../../../models/mappers/SavedPostsMapper";
import SavedPostsModel from "../../../models/domain/SavedPosts";
import { ApiError } from "../../../../utils/errors/ApiError";
import ISavedPostsRepository from "../../ISavedPostsRepository";

class MongoSavedPostsRepository implements ISavedPostsRepository {
    private savedRep: MongoRepository<SavedPostsEntity>

    constructor() {
        this.savedRep = MongoDataSource.getMongoRepository(SavedPostsEntity)
    }

    async getByUserId(userId: number): Promise<SavedPostsModel> {
        const candidate = await this.savedRep.findOneBy({ userId })
        if (!candidate) {
            throw ApiError.NotFound("User with this ID was not found")
        }

        return SavedPostsMapper.toDataModel(candidate)
    }
    async create(userId: number): Promise<SavedPostsModel> {
        const entity = this.savedRep.create({ 
            posts: [],
            userId,
        })

        await this.savedRep.insert(entity)
        return SavedPostsMapper.toDataModel(entity)
    }
    async savePost(postId: string, userId: number): Promise<SavedPostsModel> {
        const userPosts = await this.savedRep.findOneBy({ userId })
        if (!userPosts) {
            throw ApiError.NotFound("This user doesn't exist or he has not his bucket")
        }

        userPosts.posts.push(postId)
        this.savedRep.update(userPosts._id,userPosts)

        return userPosts
    }
    async removePost(postId: string, userId: number): Promise<SavedPostsModel> {
        const userPosts = await this.savedRep.findOneBy({ userId })
        if (!userPosts) {
            throw ApiError.NotFound("This user doesn't exist or he has not his bucket")
        }

        userPosts.posts = userPosts.posts.filter(id => id !== postId)
        this.savedRep.update(userPosts._id, userPosts)

        return userPosts
    }
    async checkIfSaved(postId: string, userId: number): Promise<boolean> {
        const userPosts = await this.savedRep.findOneBy({ userId })
        if (!userPosts) {
            throw ApiError.NotFound("This user doesn't exist or he has not his bucket")
        }

        return userPosts.posts.includes(postId)
    }
}

export default new MongoSavedPostsRepository()