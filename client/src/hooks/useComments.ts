import { appQueryClient } from "@/App";
import CommentService from "@/services/CommentService";
import CommentBeloning from "@/types/data/comment/CommentBelonging";
import CommentInput from "@/types/data/comment/CommentInput";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetComments = (readableId: string, commentFetchType: CommentBeloning) => useQuery({
    queryKey: [commentFetchType, readableId],
    queryFn: () => CommentService.getCommentForPost(readableId),
    enabled: !!readableId
})

const useCreateComment = (input: CommentInput, commentFetchType: CommentBeloning) => useMutation({
    mutationFn: () => CommentService.createComment(input),
    onSuccess: () => {
        appQueryClient.invalidateQueries({
            queryKey: [commentFetchType, input.postId]
        })
    }
})

export { useCreateComment, useGetComments as useGetCommentsForPost }