import ThreadCategoryModel from "../models/domain/ThreadCategory";
import IThreadCategoryRepository from "../repositories/IThreadCategoriesRepository";

class ThreadCategoryService {
    constructor(private repository: IThreadCategoryRepository) {}

    async getThreadCategories(): Promise<ThreadCategoryModel[]> {
        return this.repository.getThreadCategories()
    }
    async getThreadCategoriesByCode(code: string): Promise<ThreadCategoryModel> {
        return this.repository.getThreadCategoryByCode(code)
    }
}

export default ThreadCategoryService