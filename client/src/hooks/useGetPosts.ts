import PostsSerivce from "@/services/PostsSerivce";
import { useQuery } from "@tanstack/react-query";

function useGetPosts() {
    return useQuery({
        queryKey: ['posts-all'],
        queryFn: async () => {
            const response = await PostsSerivce.getPosts()
            return response
        }
    })
}

function useGetPostById(id: number) {
    return useQuery({
        queryKey: ['post-detailed', id],
        queryFn: async () => {
            const response = await PostsSerivce.getPostById(id)
            return response
        }
    })
}

export { useGetPosts, useGetPostById }