import { useGetCommentsForPost } from "@/hooks/useComments"
import CommentComp from "./CommentComp"
import CommentBeloning from "@/types/data/comment/CommentBelonging"

function FetchedComments({ readableId, readableType }: { readableId: string, readableType: CommentBeloning }) {
    const { data: comments } = useGetCommentsForPost(readableId, readableType)
    
    return comments && (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 font-bold text-4xl">
                <span>Comments</span>
                <span className="text-xs">●</span>
                <span>{comments.length}</span>
            </div>
            {comments.map((comment, i) => (
                <CommentComp key={i} comment={comment} />
            ))}
        </div>
    )
}

export default FetchedComments