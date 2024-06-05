import DataFindOptions from "../../utils/types/DataFindOptions";
import PostModel from "../models/domain/Post";
import { PostInputDto } from "../models/dto/posts/PostInputDto";
import PostLightModel from "../models/dto/posts/PostLightModel";
import PostUpdateDto from "../models/dto/posts/PostUpdateDto";

export default interface IPostRepository {
    getPosts: (options: DataFindOptions) => Promise<PostModel[]>
    getPostById: (id: string) => Promise<PostLightModel>
    getPostByLink: (link: string) => Promise<PostModel>
    getRandomPost(): Promise<PostLightModel>
    getPostsByCategoryCode: (code: string, options: DataFindOptions) => Promise<PostModel[]>
    getPostsByAuthorship: (authorId: number) => Promise<PostModel[]>
    getPagesAmount: (take: number) => Promise<number>
    search: (inputStr: string) => Promise<PostModel[]>
    create: (input: PostInputDto) => Promise<PostLightModel>
    update: (postId: string, input: PostUpdateDto) => Promise<PostLightModel>
    delete: (id: string) => Promise<PostLightModel>
    registerView: (id: string) => Promise<void>
    checkIfExistsByTitle: (title: string) => Promise<boolean>
}