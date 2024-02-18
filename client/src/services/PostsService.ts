import { api } from "../http/api"
import { IPostPreviewDto } from "../types/PostsTypes"

class PostsService {
    private PREFIX = '/posts'
    public getPosts = async() => {
        const posts = await api.get<IPostPreviewDto[]>(this.PREFIX)
        return posts.data
    }
}

export default new PostsService()