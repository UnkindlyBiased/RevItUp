import { api } from "@/api"
import PostDetailed from "@/types/data/posts/PostDetailed"
import PostInput from "@/types/data/posts/PostInput"
import PostPreview from "@/types/data/posts/PostPreview"
import PostShort from "@/types/data/posts/PostShort"

type SavedCheckReponse = {
    response: boolean
}

class PostService {
    private ROUTE_PREFIX: string = '/posts'
    
    async getPosts(findOptions: string = "") {
        return (await api.get<PostPreview[]>(this.ROUTE_PREFIX + `?${findOptions}`)).data
    }
    async getPostByLink(link: string): Promise<PostDetailed> {
        return (await api.get<PostDetailed>(`${this.ROUTE_PREFIX}/${link}`)).data
    }
    async getPostById(postId: string): Promise<PostDetailed> {
        return (await api.get<PostDetailed>(this.ROUTE_PREFIX + `/by-id/${postId}`)).data
    }
    async getRandomPost(): Promise<PostShort> {
        return (await api.get<PostShort>(`${this.ROUTE_PREFIX}/random`)).data
    }
    async getPostsByAuthorship(authorId: number, options: string) {
        return (await api.get<PostPreview[]>(this.ROUTE_PREFIX + `/by-auth/${authorId}${options}`)).data
    }
    async search(query: string) {
        return (await api.get<PostPreview[]>(this.ROUTE_PREFIX + `/search?inputStr=${query}`)).data
    }
    async create(inputData: PostInput): Promise<void> {
        const data = new FormData()

        Object.keys(inputData).forEach(key => {
            if (key === 'postImage' && inputData.postImage) {
                data.append(key, inputData[key]![0])
                return
            }
            data.append(key, inputData[key as keyof Omit<PostInput, 'postImage'>])
        })

        console.log(data)

        await api.post(this.ROUTE_PREFIX, data)
    }
    async update(postId: string, inputData: PostInput, userId: number): Promise<void> {
        const data = new FormData()

        data.append('id', postId)
        data.append('authorId', userId.toString())

        Object.keys(inputData).forEach(key => {
            if (key === 'postImage' && inputData.postImage) {
                data.append(key, inputData[key]![0])
                return
            }
            data.append(key, inputData[key as keyof Omit<PostInput, 'postImage'>])
        })

        await api.put(this.ROUTE_PREFIX, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    async delete(postId: string): Promise<void> {
        await api.delete(this.ROUTE_PREFIX, { data: { postId } })
    }
    async registerView(postId: string): Promise<void> {
        await api.patch(this.ROUTE_PREFIX + '/add-view', { postId })
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
    async checkIfSaved(postId: string): Promise<boolean> {
        return (await api.post<SavedCheckReponse>(this.ROUTE_PREFIX + '/saved/check', { postId })).data.response
    }
}

export default new PostService()