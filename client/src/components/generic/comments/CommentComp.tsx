import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

import { useGetSchema } from "@/hooks/useColorMode"
import Comment from "@/types/data/comment/Comment"

type CommentProps = {
    comment: Comment,
    className?: string
}

function CommentComp({ comment, className }: CommentProps): React.ReactElement {
    const schema = useGetSchema()

    return (
        <div className="flex flex-col space-y-2 bg-red-500">
            <Card className={cn("flex flex-col space-y-1 transition-all w-[65%] h-fit px-3 py-1 border-2", 
                schema.border, schema.defaultFontColor, schema.secondaryBgColor, className)}>
                <div className="flex justify-between">
                    <Link className="font-medium hover:underline" to={'/'}>
                        <span>{comment.user.username}</span>
                    </Link>
                    <span>{new Date(comment.creationDate).toLocaleString().split(':').slice(0, 2).join(':')}</span>
                </div>
                <hr className="mx-2" />
                <span className="break-words" children={comment.text} />
            </Card>
            {comment.children && comment.children.length > 0 && (
                <div className="flex w-full">
                    <div className="flex flex-col w-[95%] space-y-1">
                        {comment.children.map(child => (
                            <CommentComp key={child.id} comment={child} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommentComp