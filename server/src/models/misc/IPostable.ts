import UserModel from "../domain/User";

// TODO: add Comments
export interface IPostable {
    postTitle: string,
    text: string,
    postableId: number, // Should be for Posts and Comments
    author: UserModel,
}