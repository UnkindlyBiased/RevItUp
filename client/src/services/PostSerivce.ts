import { api } from "@/api"
import PostDetailed from "@/types/data/posts/PostDetailed"
import PostPreview from "@/types/data/posts/PostPreview"
import PostShort from "@/types/data/posts/PostShort"

class PostService {
    private ROUTE_PREFIX: string = '/posts'
    
    async getPosts(findOptions: string = "") {
        return (await api.get<PostPreview[]>(this.ROUTE_PREFIX + `?${findOptions}`)).data
    }
    async getPostByLink(link: string): Promise<PostDetailed> {
        return (await api.get<PostDetailed>(`${this.ROUTE_PREFIX}/${link}`)).data
    }
    async getRandomPost(): Promise<PostShort> {
        return (await api.get<PostShort>(`${this.ROUTE_PREFIX}/random`)).data
    }

    async getSavedPosts(): Promise<PostPreview[]> {
        return (await api.get<PostPreview[]>(`${this.ROUTE_PREFIX}/saved`)).data
    }
    async savePost(postId: string): Promise<void> {
        await api.post(this.ROUTE_PREFIX + '/saved', { postId })
    }
    async removeSavedPost(postId: string): Promise<void> {
        await api.delete(this.ROUTE_PREFIX + '/saved', { data: { postId } })
    }
}

export default new PostService()