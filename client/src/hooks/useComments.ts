import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

import CommentService from "@/services/CommentService";
import CommentBeloning from "@/types/data/comment/CommentBelonging";
import CommentInput from "@/types/data/comment/CommentInput";

const useGetComments = (readableId: string, commentFetchType: CommentBeloning, isInView?: boolean) => useQuery({
    queryKey: [commentFetchType, readableId],
    queryFn: () => CommentService.getCommentForPost(readableId),
    enabled: !!readableId && isInView
})

const useGetCommentsForThread = (threadId: string, isInView?: boolean) => useQuery({
    queryKey: ['thread-comments', threadId],
    queryFn: () => CommentService.getCommentsForThread(threadId),
    enabled: !!isInView
})

const useCreateComment = (input: CommentInput, commentFetchType: CommentBeloning) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => CommentService.createPostComment(input),
        onSettled: () => queryClient.invalidateQueries({ queryKey: [commentFetchType, input.postId] }),
        onSuccess: () => toast({ title: 'Keep the conversation!', description: 'You have successfully added the comment' })
    })
}

const useCreateThreadComment = (input: CommentInput) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => CommentService.createThreadComment(input),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['thread-comments', input.threadId] }),
        onSuccess: () => toast({ title: 'Keep the conversation!', description: 'You have successfully added the comment' })
    })
}

export {
    useGetCommentsForThread,
    useCreateComment, 
    useGetComments as useGetCommentsForPost,
    useCreateThreadComment
}