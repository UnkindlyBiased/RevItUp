import { Card } from "@/components/ui/card"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
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
        <Card className={cn("flex flex-col space-y-1 transition-all h-fit w-[65%] px-3 py-1 border-2", 
            schema.border,schema.defaultFontColor, schema.secondaryBgColor,
            className)}>
            <div className="flex justify-between">
                <Link className="font-medium hover:underline" to={'/'}>
                    <span>{comment.user.username}</span>
                </Link>
                <span>{new Date(comment.creationDate).toLocaleString().split(':').slice(0, 2).join(':')}</span>
            </div>
            <DropdownMenuSeparator className="mx-2 bg-gray-500" />
            <span className="break-words">{comment.text}</span>
        </Card>
    )
}

export default CommentComp