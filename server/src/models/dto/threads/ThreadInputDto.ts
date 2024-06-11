import ThreadModel from "../../domain/Thread";

type ThreadInputDto = Pick<ThreadModel, "threadTitle" | "threadText" | "threadLink"> & {
    threadCategoryId?: number
    authorId?: number
}

export default ThreadInputDto