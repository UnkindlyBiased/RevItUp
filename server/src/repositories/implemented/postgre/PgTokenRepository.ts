import { Repository } from "typeorm";
import TokenModel from "../../../models/domain/Token";
import ITokenRepository from "../../ITokenRepository";
import { TokenEntity } from "../../../models/entity/TokenEntity";
import TokenMapper from "../../../models/mappers/TokenMapper";
import { ApiError } from "../../../../utils/errors/ApiError";

class PgTokenRepository implements ITokenRepository {
    private tokenRep: Repository<TokenEntity>

    async getTokens(): Promise<TokenModel[]> {
        const tokens = await this.tokenRep.find()
        const tokenModels = tokens.map(entity => 
            TokenMapper.toDataModel(entity))

        return tokenModels
    }
    async getByUserId(userId: number): Promise<TokenModel> {
        const entity = await this.tokenRep.findOneBy({ user: {
            id: userId
        } })
        if (!entity) {
            throw ApiError.NotFound("Refresh token for such user doesn't exist")
        }

        return TokenMapper.toDataModel(entity)
    }
    async getByRefreshToken(refreshToken: string): Promise<TokenModel> {
        const entity = await this.tokenRep.findOneBy({ refreshToken })
        if (!entity) {
            throw ApiError.NotFound("This refresh token was not found")
        }

        return TokenMapper.toDataEntity(entity)
    }
    async create(refreshToken: string, userId: number): Promise<TokenModel> {
        const candidte = await this.tokenRep.findOneBy({
            refreshToken,
            user: {
                id: userId
            }
        })
        if (candidte) {
            throw ApiError.Conflict('This token entity already exists in the database')
        }

        const entity = this.tokenRep.create({
            refreshToken,
            user: {
                id: userId
            }
        })
        await this.tokenRep.insert(entity)

        return TokenMapper.toDataModel(entity)
    }
    async update(oldRefresh: string, newRefresh: string): Promise<TokenModel> {
        const entity = TokenMapper.toDataModel(
            await this.getByRefreshToken(oldRefresh)
        )
        entity.refreshToken = newRefresh
        
        await this.tokenRep.update(entity.id, entity)
        return TokenMapper.toDataModel(entity)
    }
    async delete(userId: number): Promise<TokenModel> {
        const entity = await this.tokenRep.remove(
            TokenMapper.toDataEntity(await this.getByUserId(userId))
        )
        
        return TokenMapper.toDataModel(entity)
    }
}

export default new PgTokenRepository()