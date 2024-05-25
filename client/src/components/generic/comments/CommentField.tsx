import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

import GenericButton from "@/components/generic/GenericButton";
import { useGetSchema } from "@/hooks/useColorMode";
import { useCreateComment } from "@/hooks/useComments";
import useUserStore from "@/store/UserStore";
import CommentInput from "@/types/data/comment/CommentInput";

type CommentFieldProps = {
    readableId: string,
    onClick?: () => void
}

// TODO: make it more flexible and accessable from threads (in the future)
function CommentUpload({ readableId }: CommentFieldProps): React.ReactNode {
    const [commentText, setCommentText] = useState<string>('')
    const user = useUserStore(state => state.user)
    const schema = useGetSchema()

    const inputData: CommentInput = {
        text: commentText,
        repliedTo: null,
        userId: user ? user.id : 0,
        postId: readableId
    }
    const { mutateAsync: uploadComment } = useCreateComment(inputData, "post-comments")
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

export default CommentUpload