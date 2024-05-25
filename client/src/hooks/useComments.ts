import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CommentService from "@/services/CommentService";
import CommentBeloning from "@/types/data/comment/CommentBelonging";
import CommentInput from "@/types/data/comment/CommentInput";
import useThemedToast from "./useThemedToast";

const useGetComments = (readableId: string, commentFetchType: CommentBeloning, isInView?: boolean) => useQuery({
    queryKey: [commentFetchType, readableId],
    queryFn: () => CommentService.getCommentForPost(readableId),
    enabled: !!readableId && isInView
})

const useCreateComment = (input: CommentInput, commentFetchType: CommentBeloning) => {
    const queryClient = useQueryClient()
    const { toast } = useThemedToast()

    return useMutation({
        mutationFn: () => CommentService.createComment(input),
        onSettled: () => queryClient.invalidateQueries({ queryKey: [commentFetchType, input.postId] }),
        onSuccess: () => toast('Keep the conversation!', 'You have successfully added the comment')
    })
}

export { useCreateComment, useGetComments as useGetCommentsForPost }