import PostFindOptions from "../../utils/types/PostFindOptions";
import PostModel from "../models/domain/Post";
import PostInputDto from "../models/dto/posts/PostInputDto";
import PostLightModel from "../models/dto/posts/PostLightModel";
import PostPreviewDto from "../models/dto/posts/PostPreviewDto";
import PostUpdateDto from "../models/dto/posts/PostUpdateDto";

export default interface IPostRepository {
    getPosts: (options: PostFindOptions) => Promise<PostModel[]>
    getPostById: (id: string) => Promise<PostModel>
    getPostByLink: (link: string) => Promise<PostModel>
    getRandomPost(): Promise<PostLightModel>
    getPostsByCategoryCode: (code: string, options: PostFindOptions) => Promise<PostModel[]>
    search: (inputStr: string) => Promise<PostPreviewDto[]>
    create: (input: PostInputDto) => Promise<PostModel>
    update: (postId: string, input: PostUpdateDto) => Promise<PostLightModel>
    delete: (id: string) => Promise<PostModel>
}