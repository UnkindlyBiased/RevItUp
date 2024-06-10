import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

import { useGetSchema } from "@/hooks/useColorMode"
import Comment from "@/types/data/comment/Comment"
import AppRoutes from "@/utils/enums/AppRoutes"

type CommentProps = {
    comment: Comment,
    className?: string
}

function CommentComp({ comment, className }: CommentProps): React.ReactElement {
    const schema = useGetSchema()

    return (
        <div className="flex flex-col space-y-2">
            <Card className={cn("flex flex-col space-y-1 transition-all w-[65%] h-fit px-3 py-1 border-2", 
                schema.border, schema.defaultFontColor, schema.secondaryBgColor, className)}>
                <div className="flex justify-between">
                    <Link className="font-medium hover:underline" to={AppRoutes.USER_PAGE.replace(':link', comment.user.userLink)}>
                        <span>{comment.user.username}</span>
                    </Link>
                    <span>{new Date(comment.creationDate).toLocaleString().split(':').slice(0, 2).join(':')}</span>
                </div>
                <hr className="mx-2" />
                <span className="break-words" children={comment.text} />
            </Card>
        </div>
    )
}

export default CommentComp