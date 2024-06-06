import ThreadCategoryModel from "../../domain/ThreadCategory";

type ThreadCategoryDto = Pick<ThreadCategoryModel, 'threadCategoryName' | 'threadCategoryCode'>

export default ThreadCategoryDto