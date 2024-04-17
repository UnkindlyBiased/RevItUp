import { Repository } from "typeorm";
import PostModel from "../../../models/domain/Post";
import IPostRepository from "../../IPostRepository";
import PostEntity from "../../../models/entity/postgre/PostEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import PostMapper from "../../../models/mappers/PostMapper";
import { ApiError } from "../../../../utils/errors/ApiError";

class PgPostRepository implements IPostRepository {
    private postRep: Repository<PostEntity>

    constructor() {
        this.postRep = PgDataSource.getRepository(PostEntity)
    }

    async getPosts(): Promise<PostModel[]> {
        const entities = await this.postRep.find()
        if (!entities) {
            throw ApiError.NotFound("No posts were found")
        }

        return entities.map(post => PostMapper.toDataModel(post))
    }
    async getPostById(id: number): Promise<PostModel> {
        if (!id) {
            throw ApiError.MissingParameters("No ID were given")
        }

        const entity = await this.postRep.findOneBy({ id })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        return PostMapper.toDataModel(entity)
    }
    async delete(id: number): Promise<PostModel> {
        if (!id) {
            throw ApiError.MissingParameters("No ID were given")
        }
        
        const entity = await this.postRep.findOneBy({ id })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        await this.postRep.remove(entity)
        return PostMapper.toDataModel(entity)
    }
}

export default new PgPostRepository()