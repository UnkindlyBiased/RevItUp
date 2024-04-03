import TokenModel from "../models/domain/Token";
import UserTokenDto from "../models/dto/users/UserTokenDto";

export default interface ITokenRepository {
    getTokens: () => Promise<TokenModel[]>
    getByUserId: (userId: number) => Promise<TokenModel>
    getByRefreshToken: (refreshToken: string) => Promise<TokenModel>
    create: (refreshToken: string, userId: number) => Promise<TokenModel>
    update: (oldRefresh: string, newRefresh: string) => Promise<TokenModel>
    delete: (userId: number) => Promise<TokenModel>
}