import PostModel from "../models/domain/Post";
import PostInputDto from "../models/dto/posts/PostInputDto";
import PostLightModel from "../models/dto/posts/PostLightModel";

export default interface IPostRepository {
    getPosts: () => Promise<PostModel[]>
    getPostById: (id: number) => Promise<PostModel>
    getPostByLink: (link: string) => Promise<PostModel>
    getRandomPost(): Promise<PostLightModel>
    create: (input: PostInputDto) => Promise<PostModel>
    delete: (id: number) => Promise<PostModel>
}