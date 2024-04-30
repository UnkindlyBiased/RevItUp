import { appQueryClient } from "@/App";
import CommentService from "@/services/CommentService";
import CommentBeloning from "@/types/data/comment/CommentBelonging";
import CommentInput from "@/types/data/comment/CommentInput";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetCommentsForPost = (postId: string) => useQuery({
    queryKey: ['post-comments', postId],
    queryFn: () => CommentService.getCommentForPost(postId),
    enabled: !!postId
})

const useCreateComment = (input: CommentInput, commentFetchType: CommentBeloning) => useMutation({
    mutationFn: () => CommentService.createComment(input),
    onSuccess: () => {
        appQueryClient.invalidateQueries({
            queryKey: [commentFetchType, input.postId]
        })
    }
})

export { useCreateComment, useGetCommentsForPost }