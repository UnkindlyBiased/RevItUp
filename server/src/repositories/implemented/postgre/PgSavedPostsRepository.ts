import { Repository } from "typeorm";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import SavedPostsMapper from "../../../models/mappers/SavedPostsMapper";
import SavedPostsModel from "../../../models/domain/SavedPosts";
import ISavedPostsRepository from "../../ISavedPostsRepository";
import SavedPostsEntity from "../../../models/entity/postgre/SavedPostsEntity";

class PgSavedPostsRepository implements ISavedPostsRepository {
    private savedRep: Repository<SavedPostsEntity>

    constructor() {
        this.savedRep = PgDataSource.getRepository(SavedPostsEntity)
    }

    async getByUserId(userId: number): Promise<SavedPostsModel> {
        const candidate = await this.savedRep.findOneOrFail({
            where: {
                user: { id: userId }
            },
            select: {
                id: true,
                posts: true,
                user: { id: true }
            },
            relations: ['user']
        })

        return SavedPostsMapper.toDataModel(candidate)
    }
    async create(userId: number): Promise<SavedPostsModel> {
        const entity = this.savedRep.create({
            user: { id: userId },
            posts: []
        })

        await this.savedRep.insert(entity)
        return SavedPostsMapper.toDataModel(entity)
    }
    async savePost(postId: string, userId: number): Promise<SavedPostsModel> {
        const userPosts = await this.savedRep.findOneOrFail({
            where: { user: { id: userId } },
            relations: ['user']
        })

        userPosts.posts.push(postId)
        this.savedRep.update(userPosts.id, userPosts)

        return SavedPostsMapper.toDataModel(userPosts)
    }
    async removePost(postId: string, userId: number): Promise<SavedPostsModel> {
        const userPosts = await this.savedRep.findOneOrFail({
            where: { user: { id: userId } },
            relations: ['user']
        })

        userPosts.posts = userPosts.posts.filter(id => id !== postId)
        this.savedRep.update(userPosts.id, userPosts)

        return SavedPostsMapper.toDataModel(userPosts)
    }
    async checkIfSaved(postId: string, userId: number): Promise<boolean> {
        const userPosts = await this.savedRep.findOneByOrFail({ user: { id: userId } })

        return userPosts.posts.includes(postId)
    }
}

export default PgSavedPostsRepository