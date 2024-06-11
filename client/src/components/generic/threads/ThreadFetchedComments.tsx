import { useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

import { useGetCommentsForThread } from "@/hooks/useComments"
import CommentComp from "../comments/CommentComp"

function ThreadFetchedComments({ threadId, className }: { threadId: string, className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const { data: comments } = useGetCommentsForThread(threadId, isInView)

    return (
        <div className={cn("flex flex-col space-y-2", className)} ref={ref}>
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

export default ThreadFetchedComments