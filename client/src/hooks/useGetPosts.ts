import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import PostSerivce from "@/services/PostSerivce";
import useUserStore from "@/store/UserStore";
import PostInput from "@/types/data/posts/PostInput";
import useThemedToast from "./useThemedToast";

const useGetPosts = (findOptions: string = "") =>  useQuery({
    queryKey: ['posts-all', findOptions],
    queryFn: () => PostSerivce.getPosts(findOptions),
    retry: 1
})

const useGetPostByLink = (link: string) => useSuspenseQuery({
    queryKey: ['post-detailed', link],
    queryFn: () => PostSerivce.getPostByLink(link),
    refetchOnWindowFocus: false
})

const useGetPostById = (postId: string | null) => useQuery({
    queryKey: ['post-by-id', postId],
    queryFn: () => PostSerivce.getPostById(postId || ''),
    enabled: !!postId,
})

const useGetRandomPost = () => useQuery({
    queryKey: ['random-post'],
    queryFn: () => PostSerivce.getRandomPost(),
    refetchOnWindowFocus: false
})

const useGetPostsByAuthorship = (authorId: number, options: string = "") => useQuery({
    queryKey: ['authored-posts', authorId],
    queryFn: () => PostSerivce.getPostsByAuthorship(authorId, options)
})

const useSearchPosts = (inputQuery: string) => useQuery({
    queryKey: ['search-posts', inputQuery],
    queryFn: () => PostSerivce.search(inputQuery)
})

const useCreatePost = (inputData: PostInput) => {
    const user = useUserStore(state => state.user)

    const { toast } = useThemedToast()
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['create-post'],
        mutationFn: () => PostSerivce.create(inputData),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['authored-posts', user?.id || 0] }),
        onSuccess: () => toast('Post is successfully created')
    })
}

const useEditPost = (postId: string, inputData: PostInput) => {
    const user = useUserStore(state => state.user)
    const queryClient = useQueryClient()
    const { toast } = useThemedToast()

    return useMutation({
        mutationKey: ['edit-post', postId],
        mutationFn: () => PostSerivce.update(postId, inputData, user?.id || 0),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['posts-all'] })
            queryClient.invalidateQueries({ queryKey: ['post-by-id', postId] })
            queryClient.invalidateQueries({ queryKey: ['authored-posts', user?.id || 0 ] })
        },
        onSuccess: () => toast('Congratulations!', 'Your post was successfully updated')
    })
}

const useDeletePost = (postId: string) => {
    const queryClient = useQueryClient()
    const { toast } = useThemedToast()
    const user = useUserStore(state => state.user)
    
    return useMutation({
        mutationKey: ['delete-post'],
        mutationFn: () => PostSerivce.delete(postId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['authored-posts', user?.id || 0] })
            queryClient.invalidateQueries({ queryKey: ["saved-posts"] })
        },
        onSuccess: () => toast('Deletion', 'Post was successfully deleted')
    })
}

const useRegisterView = (postId: string) => useMutation({
    mutationFn: () => PostSerivce.registerView(postId)
})

const useCheckByTitle = (title: string) => useQuery({
    queryKey: ['title-check', title],
    queryFn: () => PostSerivce.checkIfExistsByTitle(title),
    enabled: !!title && title.length >= 15,
    refetchOnWindowFocus: false,
    staleTime: 3000
})

const useGetSavedPosts = () => useQuery({
    queryKey: ['saved-posts'],
    queryFn: () => PostSerivce.getSavedPosts()
})

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
    useSearchPosts,
    useRegisterView,
    useCheckByTitle,
    useCreatePost,
    useEditPost,
    useDeletePost,
    useSavePost, 
    useRemoveSavedPost, 
    useGetSavedCheck 
}