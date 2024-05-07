import { useMutation, useQuery } from "@tanstack/react-query";

import PostSerivce from "@/services/PostSerivce";
import { appQueryClient } from "@/App";

const useGetPosts = (findOptions: string = "") =>  useQuery({
    queryKey: ['posts-all'],
    queryFn: () => PostSerivce.getPosts(findOptions)
})

const useGetPostByLink = (link: string) => useQuery({
    queryKey: ['post-detailed', link],
    queryFn: () => PostSerivce.getPostByLink(link),
    enabled: !!link
})

const useGetRandomPost = () => useQuery({
    queryKey: ['random-post'],
    queryFn: () => PostSerivce.getRandomPost()
})

const useGetSavedPosts = () => useQuery({
    queryKey: ['saved-posts'],
    queryFn: () => PostSerivce.getSavedPosts()
})

const useSavePost = (postId: string) => useMutation({
    mutationFn: () => PostSerivce.savePost(postId),
    onSuccess: () => {
        appQueryClient.invalidateQueries({ queryKey: ['saved-posts'] })
        appQueryClient.invalidateQueries({ queryKey: ['saved-check', postId]})
    }
})

const useRemoveSavedPost = (postId: string) => useMutation({
    mutationFn: () => PostSerivce.removeSavedPost(postId),
    onSuccess: () => {
        appQueryClient.invalidateQueries({ queryKey: ['saved-posts'] })
        appQueryClient.invalidateQueries({ queryKey: ['saved-check', postId]})
    }
})

const useGetSavedCheck = (postId: string) => useQuery({
    queryKey: ['saved-check', postId],
    queryFn: () => PostSerivce.checkIfSaved(postId)
})

export { 
    useGetPosts, 
    useGetPostByLink, 
    useGetRandomPost, 
    useGetSavedPosts, 
    useSavePost, 
    useRemoveSavedPost, 
    useGetSavedCheck 
}