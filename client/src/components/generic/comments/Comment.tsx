import { Card } from "@/components/ui/card"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useGetSchema } from "@/hooks/useColorMode"
import { cn } from "@/lib/utils"
import Comment from "@/types/data/comment/Comment"
import { Link } from "react-router-dom"

type CommentProps = {
    comment: Comment,
    className?: string
}

function CommentComp({ comment, className }: CommentProps): React.ReactElement {
    const schema = useGetSchema()

    return (
        <div>
            <Card className={cn("flex flex-col space-y-1 transition-all h-fit w-[55%] px-3 py-1 border-2", 
                schema.border,schema.defaultFontColor, schema.bgColor,
                className)}>
                <div className="flex justify-between space-1">
                    <Link className="font-medium hover:underline" to={'/'}>
                        <span>{comment.user.username}</span>
                    </Link>
                    <span>{new Date(comment.creationDate).toLocaleDateString()}</span>
                </div>
                <DropdownMenuSeparator className={cn("mx-2 bg-gray-500 opacity-45")} />
                <span className="break-words">{comment.text}</span>
            </Card> 
        </div>
    )
}

export default CommentComp