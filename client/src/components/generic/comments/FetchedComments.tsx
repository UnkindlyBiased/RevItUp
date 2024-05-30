import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"

import { useGetCommentsForPost } from "@/hooks/useComments"
import CommentComp from "./CommentComp"
import CommentBeloning from "@/types/data/comment/CommentBelonging"

type FetchedCommentsProps = {
    readableId: string,
    readableType: CommentBeloning,
    className: string
}

function FetchedComments({ readableId, readableType, className }: FetchedCommentsProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const { data: comments } = useGetCommentsForPost(readableId, readableType, isInView)
    
    return (
        <div className={cn("flex flex-col space-y-4", className)} ref={ref}>
            {comments && (
                <>
                    <div className="flex items-center space-x-2 font-bold text-4xl">
                        <span>Comments</span>
                        <span className="text-xs">●</span>
                        <span>{comments.length}</span>
                    </div>
                    {comments.map((comment, i) => (
                        <CommentComp key={i} comment={comment} />
                    ))}
                </>
            )}
        </div>
    )
}

export default FetchedComments