import TokenModel from "../models/domain/Token";
import PgTokenRepository from "../repositories/implemented/postgre/PgTokenRepository";
import ITokenRepository from "../repositories/ITokenRepository";

class TokenService {
    constructor(private repository: ITokenRepository) { }

    async getByRefreshToken(refreshToken: string): Promise<TokenModel> {
        const token = await this.repository.getByRefreshToken(refreshToken)
        return token
    }
    async getByUserId(userId: number): Promise<TokenModel> {
        const token = await this.repository.getByUserId(userId)
        return token
    }
    async saveToken(userId: number, refreshToken: string): Promise<TokenModel> {
        const token = await this.repository.create(refreshToken, userId)
        return token
    }
    async removeToken(userId: number): Promise<TokenModel> { // Removes the token from DB by user's ID
        const token = await this.repository.delete(userId)
        return token
    }
}

export default new TokenService(PgTokenRepository)