import ThreadCategoryModel from "../../domain/ThreadCategory";

type ThreadCategoryDto = Omit<ThreadCategoryModel, 'threadCategoryDescription' | 'id'>

export default ThreadCategoryDto