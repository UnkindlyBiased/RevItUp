import ThreadCategory from "./ThreadCategory";

type ThreadCategoryShort = Omit<ThreadCategory, 'id' | 'threadCategoryDescription'>

export default ThreadCategoryShort