import PostModel from "../models/domain/Post";

export default interface IPostRepository {
    getPosts: () => Promise<PostModel[]>
    getPostById: (id: number) => Promise<PostModel>
    getPostByLink: (link: string) => Promise<PostModel>
    delete: (id: number) => Promise<PostModel>
}