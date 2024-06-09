import { Repository } from "typeorm";

import IThreadCategoryRepository from "../../IThreadCategoriesRepository";
import ThreadCategoryEntity from "../../../models/entity/postgre/ThreadCategoryEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import ThreadCategoryModel from "../../../models/domain/ThreadCategory";
import ThreadCategoryMapper from "../../../models/mappers/ThreadCategoryMapper";

class PgThreadCategoryRepository implements IThreadCategoryRepository {
    private readonly threadCatRep: Repository<ThreadCategoryEntity>

    constructor() {
        this.threadCatRep = PgDataSource.getRepository(ThreadCategoryEntity)
    }

    async getThreadCategories(): Promise<ThreadCategoryModel[]> {
        const entities = await this.threadCatRep.find()
        return entities.map(threadCat => ThreadCategoryMapper.toDataModel(threadCat))
    }
    async getThreadCategoryByCode(code: string): Promise<ThreadCategoryModel> {
        const entity = await this.threadCatRep.findOneByOrFail({ threadCategoryCode: code })
        return ThreadCategoryMapper.toDataModel(entity)
    }
}

export default PgThreadCategoryRepository