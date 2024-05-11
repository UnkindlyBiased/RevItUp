import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CommentService from "@/services/CommentService";
import CommentBeloning from "@/types/data/comment/CommentBelonging";
import CommentInput from "@/types/data/comment/CommentInput";

const useGetComments = (readableId: string, commentFetchType: CommentBeloning) => useQuery({
    queryKey: [commentFetchType, readableId],
    queryFn: () => CommentService.getCommentForPost(readableId),
    enabled: !!readableId
})

const useCreateComment = (input: CommentInput, commentFetchType: CommentBeloning) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => CommentService.createComment(input),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [commentFetchType, input.postId]
            })
        }
    })
}

export { useCreateComment, useGetComments as useGetCommentsForPost }