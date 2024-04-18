import { api } from "@/api"
import PostDetailed from "@/types/data/posts/PostDetailed"
import PostShort from "@/types/data/posts/PostShort"

class PostService {
    private URL_PREFIX: string = '/posts'
    
    async getPosts() {
        const posts = (await api.get<PostShort[]>(this.URL_PREFIX)).data
        return posts
    }
    async getPostByLink(link: string): Promise<PostDetailed> {
        const post = (await api.get<PostDetailed>(`${this.URL_PREFIX}/${link}`)).data
        return post
    }
}

export default new PostService()