import { api } from "@/api";
import Comment from "@/types/data/comment/Comment";
import CommentInput from "@/types/data/comment/CommentInput";

class CommentService {
    private API_PREFIX: string = "/comments"

    async getCommentForPost(postId: string) {
        const comments = (await api.get<Comment[]>(`${this.API_PREFIX}/post/${postId}`)).data
        return comments
    }
    async createComment(input: CommentInput) {
        const comment = (await api.post<CommentInput>(this.API_PREFIX + '/post', input)).data
        return comment
    }
}

export default new CommentService()