import { api } from "@/api"
import PostDetailed from "@/types/data/posts/PostDetailed"
import PostPreview from "@/types/data/posts/PostPreview"
import PostShort from "@/types/data/posts/PostShort"

class PostService {
    private ROUTE_PREFIX: string = '/posts'
    
    async getPosts() {
        const posts = (await api.get<PostPreview[]>(this.ROUTE_PREFIX)).data
        return posts
    }
    async getPostByLink(link: string): Promise<PostDetailed> {
        const post = (await api.get<PostDetailed>(`${this.ROUTE_PREFIX}/${link}`)).data
        return post
    }
    async getRandomPost(): Promise<PostShort> {
        return (await api.get<PostShort>(`${this.ROUTE_PREFIX}/random`)).data
    }
}

export default new PostService()