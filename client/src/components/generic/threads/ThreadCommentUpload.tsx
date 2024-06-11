import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

import { useGetSchema } from "@/hooks/useColorMode"
import useUserStore from "@/store/UserStore"
import CommentInput from "@/types/data/comment/CommentInput"
import { useCreateThreadComment } from "@/hooks/useComments"
import GenericButton from "../misc/input/GenericButton"

function ThreadCommentUpload({ threadId }: { threadId: string }) {
    const [commentText, setCommentText] = useState<string>('')
    const user = useUserStore(state => state.user)
    const schema = useGetSchema()

    const inputData: CommentInput = {
        text: commentText,
        userId: user ? user.id : 0,
        threadId
    }

    const { mutateAsync: uploadComment } = useCreateThreadComment(inputData)
    const action = async () => {
        try {
            await uploadComment()
            setCommentText('')
        } catch(e) {
            console.log(e)
        }
    }

    if (!user) return (
        <span className="text-xl">
            Please <Link className="hover:underline font-bold" to={'/login'}>login</Link> or <Link className="hover:underline font-bold" to={'/register'}>register</Link> if you want to write a comment
        </span>
    )
    if (!user.isVerified) return <span className="text-xl" children='Please verify your account (check your email inbox)' />
    if (user.role === 'banned') return <span className="text-xl" children="You're banned from writing comments" />

    return (
        <div className="flex flex-col space-y-3">
            <Textarea
                className={cn("w-[45%] h-24", schema.secondaryBgColor)} 
                value={commentText} placeholder="Write your comments here. Please obey the rule and be nice with others :)" 
                onChange={(e) => setCommentText(e.target.value)} />
            <GenericButton 
                disabled={commentText.trim().length === 0} 
                onClick={action} 
                className={cn(schema.primaryBgColor, "text-white font-medium disabled:opacity-50")}
                children="Upload comment" />
        </div>
    )
}

export default ThreadCommentUpload