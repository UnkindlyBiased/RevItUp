import SavedPostsModel from "../models/domain/SavedPosts"

export default interface ISavedPostsRepository {
    getByUserId: (userId: number) => Promise<SavedPostsModel>
    create: (userId: number) => Promise<SavedPostsModel>
    delete: (userId: number) => Promise<SavedPostsModel>
}