import ThreadModel from "../../domain/Thread";

type ThreadInputDto = Pick<ThreadModel, "threadTitle" | "threadText" | "threadLink"> & {
    authorId?: number
}

export default ThreadInputDto