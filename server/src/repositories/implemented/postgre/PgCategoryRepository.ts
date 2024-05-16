import { Repository } from "typeorm";
import CategoryEntity from "../../../models/entity/postgre/CategoryEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import CategoryMapper from "../../../models/mappers/CategoryMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import ICategoryRepository from "../../ICategoryRepository";
import CategoryCreateDto from "../../../models/dto/categories/CategoryCreateDto";
import CategoryModel from "../../../models/domain/Category";

class PgCategoryRepository implements ICategoryRepository {
    private categoryRep: Repository<CategoryEntity>

    constructor() {
        this.categoryRep = PgDataSource.getRepository(CategoryEntity)
    }

    async getCategories(): Promise<CategoryModel[]> {
        const entities = await this.categoryRep.find({
            order: {
                id: 'ASC'
            }
        })
        return entities.map(entity => CategoryMapper.toDataModel(entity))
    }
    async getByCategoryCode(code: string): Promise<CategoryModel> {
        const entity = await this.categoryRep.findOneBy({ categoryCode: code })
        if (!entity) {
            throw ApiError.NotFound("Post category was not found by such code")
        }

        return CategoryMapper.toDataModel(entity)
    }
    async getCategoriesByPostsLengthSorted(): Promise<CategoryModel[]> {
        const entities = await this.categoryRep.find({
            relations: ['posts'],
            take: 3
        }).then(categories => categories.sort((a, b) => a.posts.length < b.posts.length ? 1 : -1) )

        return entities.map(category => CategoryMapper.toDataModel(category))
    }
    async create(input: CategoryCreateDto): Promise<CategoryModel> {
        const candidate = await this.categoryRep.findOne({
            where: [
                { categoryName: input.categoryName },
                { categoryCode: input.categoryCode }
            ]
        })
        if (candidate) {
            throw ApiError.Conflict("Category with this data already exists")
        }

        const entity = this.categoryRep.create({ ...input })
        await this.categoryRep.insert(entity)

        return CategoryMapper.toDataModel(entity)
    }
    async deleteByCategoryCode(code: string): Promise<CategoryModel> {
        const entity = await this.categoryRep.findOneBy({ categoryCode: code })
        if (!entity) {
            throw ApiError.NotFound("Post category was not found by such code")
        }

        await this.categoryRep.remove(entity)

        return CategoryMapper.toDataModel(entity)
    }
}

export default PgCategoryRepository