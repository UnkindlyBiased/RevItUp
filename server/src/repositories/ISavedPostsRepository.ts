import SavedPostsModel from "../models/domain/SavedPosts"

export default interface ISavedPostsRepository {
    getByUserId: (userId: number) => Promise<SavedPostsModel>
    create: (userId: number) => Promise<SavedPostsModel>
    savePost: (postId: string, userId: number) => Promise<SavedPostsModel>
    removePost: (postId: string, userId: number) => Promise<SavedPostsModel>
    checkIfSaved: (postId: string, userId: number) => Promise<boolean>
}