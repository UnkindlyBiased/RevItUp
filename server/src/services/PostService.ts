import PostCreateDto from "../models/dto/posts/PostCreateDto";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostRepository from "../repositories/PostRepository";

class PostService {
    // TODO: add creationDate to DTO when work with frontend part will be started
    async getPosts(): Promise<PostPreviewDto[]> {
        const posts = await PostRepository.getPosts()
        const postPreviews: PostPreviewDto[] = posts.map((post) => {
            return {
                id: post.id,
                postTitle: post.postTitle,
                previewText: post.previewText
            }
        })
        return postPreviews
    }
    async create(post: PostCreateDto): Promise<PostCreateDto> {
        const newPost: PostCreateDto = await PostRepository.create(post)
        return newPost
    }
}

export default new PostService()