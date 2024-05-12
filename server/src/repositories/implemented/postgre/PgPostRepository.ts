import { ILike, Repository } from "typeorm";
import PostModel from "../../../models/domain/Post";
import IPostRepository from "../../IPostRepository";
import PostEntity from "../../../models/entity/postgre/PostEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import PostMapper from "../../../models/mappers/PostMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import PostInputDto from "../../../models/dto/posts/PostInputDto"
import PostLightModel from "../../../models/dto/posts/PostLightModel";
import PostUpdateDto from "../../../models/dto/posts/PostUpdateDto";
import PostFindOptions from "../../../../utils/types/PostFindOptions";

class PgPostRepository implements IPostRepository {
    private postRep: Repository<PostEntity>

    constructor() {
        this.postRep = PgDataSource.getRepository(PostEntity)
    }

    async getPosts(options: PostFindOptions): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            take: options.take,
            skip: options.skip
        })
        if (!entities) {
            throw ApiError.NotFound("No posts were found")
        }

        return entities.map(post => PostMapper.toDataModel(post))
    }
    // ! For editing purposes
    async getPostById(id: string): Promise<PostLightModel> {
        if (!id) {
            throw ApiError.MissingParameters("No ID were given")
        }

        const entity = await this.postRep.findOneBy({ id })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        return PostMapper.toLightDataModel(entity)
    }
    async getPostByLink(link: string): Promise<PostModel> {
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
            .then(post => post)
        if (!post) {
            throw ApiError.NotFound("No posts were found in database")
        }

        return PostMapper.toLightDataModel(post)
    }
    async getPostsByAuthorship(authorId: number, options: PostFindOptions): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            where: {
                author: {
                    id: authorId
                }
            },
            take: options.take,
            skip: options.skip
        })

        return entities.map(post => PostMapper.toDataModel(post))
    }
    async getPostsByCategoryCode(code: string, options: PostFindOptions): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            where: {
                category: { categoryCode: code }
            },
            take: options.take,
            skip: options.skip,
        })

        return entities.map(entity => PostMapper.toDataModel(entity))
    }
    async search(searchStr: string): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            where: {
                postTitle: ILike(`%${searchStr}%`)
            }
        })

        return entities.map(entity => PostMapper.toDataModel(entity))
    }
    async create(input: PostInputDto): Promise<PostModel> {
        const candidate = await this.postRep.findOneBy({
            postTitle: input.postTitle
        })
        if (candidate) {
            throw ApiError.Conflict("Post with this title already exists")
        }

        const entity = this.postRep.create({
            ...input,
            author: { id: input.authorId },
            category: { id: input.categoryId }
        })

        await this.postRep.insert(entity)

        return PostMapper.toDataModel(entity)
    }
    async update(postId: string, input: PostUpdateDto): Promise<PostLightModel> {
        await this.postRep.update(postId, {
            postTitle: input.postTitle,
            previewText: input.previewText,
            text: input.text,
            postLink: input.postLink,
            imageLink: input.imageLink,
            category: {
                id: input.categoryId
            }
        })

        const entity = await this.postRep.preload({ id: postId })
        if (!entity) {
            throw ApiError.NotFound("No such post exists")
        }

        return PostMapper.toLightDataModel(entity)
    }
    async delete(id: string): Promise<PostModel> {
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