import ThreadCategoryModel from "../models/domain/ThreadCategory";

export default interface IThreadCategoryRepository {
    getThreadCategories: () => Promise<ThreadCategoryModel[]>
    getThreadCategoryByCode: (code: string) => Promise<ThreadCategoryModel>
}