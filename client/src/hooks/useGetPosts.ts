import PostsSerivce from "@/services/PostsSerivce";
import UserService from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

const useGetPosts = () =>  useQuery({
    queryKey: ['posts-all'],
    queryFn: () => PostsSerivce.getPosts()
})

const useGetPostByLink = (link: string) => useQuery({
    queryKey: ['post-detailed', link],
    queryFn: () => PostsSerivce.getPostByLink(link),
    enabled: !!link
})

const useGetRandomPost = () => useQuery({
    queryKey: ['random-post'],
    queryFn: () => PostsSerivce.getRandomPost()
})

const useGetSavedPosts = () => useQuery({
    queryKey: ['saved-posts'],
    queryFn: () => UserService.getSavedPosts()
})

export { useGetPosts, useGetPostByLink, useGetRandomPost, useGetSavedPosts }