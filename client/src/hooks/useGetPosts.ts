import PostsSerivce from "@/services/PostsSerivce";
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

export { useGetPosts, useGetPostByLink, useGetRandomPost }