import UserModel from "./User";

export default interface TokenModel {
    id: number,
    refreshToken: string,
    user: UserModel
}