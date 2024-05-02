import { Repository } from "typeorm";
import CategoryEntity from "../../../models/entity/postgre/CategoryEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import CategoryMapper from "../../../models/mappers/CategoryMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import ICategoryRepository from "../../ICategoryRepository";

class PgCategoryRepository implements ICategoryRepository {
    private categoryRep: Repository<CategoryEntity>

    constructor() {
        this.categoryRep = PgDataSource.getRepository(CategoryEntity)
    }

    async getCategories() {
        const entities = await this.categoryRep.find()
        return entities.map(entity => CategoryMapper.toDataModel(entity))
    }
    async getByCategoryCode(code: string) {
        const entity = await this.categoryRep.findOneBy({ 
            categoryCode: code 
        })
        if (!entity) {
            throw ApiError.NotFound("Post category was not found by such code")
        }

        return CategoryMapper.toDataModel(entity)
    }
    async deleteByCategoryCode(code: string) {
        const entity = await this.categoryRep.findOneBy({ 
            categoryCode: code 
        })
        if (!entity) {
            throw ApiError.NotFound("Post category was not found by such code")
        }

        await this.categoryRep.remove(entity)

        return CategoryMapper.toDataModel(entity)
    }
}

export default PgCategoryRepository