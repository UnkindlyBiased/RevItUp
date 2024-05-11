import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import PostSerivce from "@/services/PostSerivce";
import useUserStore from "@/store/UserStore";
import PostInput from "@/types/data/posts/PostInput";

const useGetPosts = (findOptions: string = "") =>  useQuery({
    queryKey: ['posts-all'],
    queryFn: () => PostSerivce.getPosts(findOptions)
})

const useGetPostByLink = (link: string) => useQuery({
    queryKey: ['post-detailed', link],
    queryFn: () => PostSerivce.getPostByLink(link),
    enabled: !!link,
    retry: 1
})

const useGetPostById = (postId: string | null) => useQuery({
    queryKey: ['post-by-id', postId],
    queryFn: () => PostSerivce.getPostById(postId || ''),
    enabled: !!postId,
})

const useGetRandomPost = () => useQuery({
    queryKey: ['random-post'],
    queryFn: () => PostSerivce.getRandomPost()
})

const useGetPostsByAuthorship = (authorId: number, options: string = "") => useQuery({
    queryKey: ['authored-posts', authorId],
    queryFn: () => PostSerivce.getPostsByAuthorship(authorId, options)
})

const useGetSavedPosts = () => useQuery({
    queryKey: ['saved-posts'],
    queryFn: () => PostSerivce.getSavedPosts()
})

const useEditPost = (postId: string, inputData: PostInput) => {
    const user = useUserStore(state => state.user)
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['edit-post', postId],
        mutationFn: () => PostSerivce.update(postId, inputData, user?.id || 0),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts-all'] })
            queryClient.invalidateQueries({ queryKey: ['post-by-id', postId] })
            queryClient.invalidateQueries({ queryKey: ["saved-posts"] })
        }
    })
}

const useDeletePost = (postId: string) => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationKey: ['delete-post'],
        mutationFn: () => PostSerivce.delete(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts-all'] })
            queryClient.invalidateQueries({ queryKey: ["saved-posts"] })
        }
    })
}

const useSavePost = (postId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['save-post', postId],
        mutationFn: () => PostSerivce.savePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['saved-posts'] })
            queryClient.invalidateQueries({ queryKey: ['saved-check', postId]})
        }
    })
}

const useRemoveSavedPost = (postId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['remove-saved-post', postId],
        mutationFn: () => PostSerivce.removeSavedPost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['saved-posts'] })
            queryClient.invalidateQueries({ queryKey: ['saved-check', postId]})
        }
    })
}

const useGetSavedCheck = (postId: string) => {
    const isAuth = useUserStore(state => state.isAuth)

    return useQuery({
        queryKey: ['saved-check', postId],
        queryFn: () => PostSerivce.checkIfSaved(postId),
        enabled: isAuth
    })
}

export { 
    useGetPosts, 
    useGetPostByLink, 
    useGetPostById,
    useGetRandomPost,
    useGetPostsByAuthorship, 
    useGetSavedPosts,
    useEditPost,
    useDeletePost,
    useSavePost, 
    useRemoveSavedPost, 
    useGetSavedCheck 
}