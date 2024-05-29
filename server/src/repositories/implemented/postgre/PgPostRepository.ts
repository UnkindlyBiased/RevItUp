import { ILike, Repository } from "typeorm";

import PostModel from "../../../models/domain/Post";
import IPostRepository from "../../IPostRepository";
import PostEntity from "../../../models/entity/postgre/PostEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import PostMapper from "../../../models/mappers/PostMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import { PostInputDto } from "../../../models/dto/posts/PostInputDto"
import PostLightModel from "../../../models/dto/posts/PostLightModel";
import PostUpdateDto from "../../../models/dto/posts/PostUpdateDto";
import DataFindOptions from "../../../../utils/types/DataFindOptions";

class PgPostRepository implements IPostRepository {
    private postRep: Repository<PostEntity>

    constructor() {
        this.postRep = PgDataSource.getRepository(PostEntity)
    }

    async getPosts(options: DataFindOptions): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            take: options.take,
            skip: options.take * (options.page - 1),
            relations: ['author', 'author.country', 'category'],
            order: {
                creationDate: 'DESC'
            },
        })

        return entities.map(post => PostMapper.toDataModel(post))
    }
    async getPostById(id: string): Promise<PostLightModel> {
        if (!id) {
            throw ApiError.MissingParameters("No ID were given")
        }

        const entity = await this.postRep.findOne({
            where: { id },
            relations: ['author', 'author.country', 'category']
        })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        return PostMapper.toLightDataModel(entity)
    }
    async getPostByLink(link: string): Promise<PostModel> {
        if (!link) {
            throw ApiError.MissingParameters("No link was given")
        }

        const entity = await this.postRep.findOne({
            where: {
                postLink: link
            },
            relations: ['author', 'author.country', 'category']
        })
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
            throw ApiError.BadRequest("No posts were found in database")
        }

        return PostMapper.toLightDataModel(post)
    }
    async getPostsByAuthorship(authorId: number, options: DataFindOptions): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            where: {
                author: {
                    id: authorId
                }
            },
            relations: ['author', 'author.country', 'category'],
            take: options.take
        })

        return entities.map(post => PostMapper.toDataModel(post))
    }
    async getPostsByCategoryCode(code: string, options: DataFindOptions): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            where: {
                category: { categoryCode: code }
            },
            relations: ['author', 'author.country', 'category'],
            take: options.take
        })

        return entities.map(entity => PostMapper.toDataModel(entity))
    }
    async getPagesAmount(take: number): Promise<number> {
        const allEntities = await this.postRep.find({
            select: { id: true }
        })
        const pagesAmount = Math.floor(allEntities.length / take)

        return pagesAmount !== 0 ? pagesAmount : 1
    }
    async search(searchStr: string): Promise<PostModel[]> {
        const entities = await this.postRep.find({
            where: {
                postTitle: ILike(`%${searchStr}%`)
            },
            relations: ['author', 'author.country', 'category']
        })

        return entities.map(entity => PostMapper.toDataModel(entity))
    }
    async create(input: PostInputDto): Promise<PostLightModel> {
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

        return PostMapper.toLightDataModel(entity)
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
    async delete(id: string): Promise<PostLightModel> {
        if (!id) {
            throw ApiError.MissingParameters("No ID were given")
        }
        
        const entity = await this.postRep.findOneBy({ id })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        await this.postRep.remove(entity)
        return PostMapper.toLightDataModel(entity)
    }
    async registerView(id: string): Promise<void> {
        const entity = await this.postRep.findOne({
            select: {
                id: true,
                views: true
            },
            where: { id }
        })
        if (!entity) {
            throw ApiError.NotFound("Such post doesn't exist")
        }

        await this.postRep.update(id, { views: entity.views + 1 })
    }
}

export default new PgPostRepository()