import { Repository } from "typeorm";
import PostModel from "../../../models/domain/Post";
import IPostRepository from "../../IPostRepository";
import PostEntity from "../../../models/entity/postgre/PostEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import PostMapper from "../../../models/mappers/PostMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import PostInputDto from "../../../models/dto/posts/PostInputDto";
import PgUserRepository from "./PgUserRepository";
import UserMapper from "../../../models/mappers/UserMapper";
import PostLightModel from "../../../models/dto/posts/PostLightModel";

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
    async getPostByLink(link: string) {
        if (!link) {
            throw ApiError.MissingParameters("No link was given")
        }

        const entity = await this.postRep.findOneBy({ postLink: link })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        return PostMapper.toDataModel(entity)
    }
    async getRandomPost(): Promise<PostLightModel> {
        const post = await this.postRep
            .createQueryBuilder('post')
            .orderBy('RANDOM()')
            .getOne()
            .then(post => { return post })
        if (!post) {
            throw ApiError.NotFound("No posts were found in database")
        }

        return PostMapper.toLightDataModel(post)
    }
    async create(input: PostInputDto): Promise<PostModel> {
        const candidate = await this.postRep.findOneBy({
            postTitle: input.postTitle
        })
        if (candidate) {
            throw ApiError.Conflict("Post with this title already exists")
        }

        const entity = this.postRep.create({
            postTitle: input.postTitle,
            previewText: input.previewText,
            text: input.text,
            imageLink: input.imageLink,
            postLink: input.postLink,
            comments: [],
            author: UserMapper.mapUserModelToUserShortDto(
                await PgUserRepository.getUserById(input.authorId)
            )
        })

        await this.postRep.insert(entity)
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