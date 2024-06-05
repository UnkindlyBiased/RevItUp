import ThreadCategoryModel from "../../domain/ThreadCategory";

type ThreadCategoryDto = Omit<ThreadCategoryModel, 'id'>

export default ThreadCategoryDto