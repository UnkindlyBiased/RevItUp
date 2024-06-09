import Thread from "./Thread";

type ThreadInput = Pick<Thread, 'threadTitle' | 'threadText'> & {
    threadCategoryId: string
    authorId?: number
}

export default ThreadInput