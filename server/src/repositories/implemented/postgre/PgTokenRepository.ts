import { Repository } from "typeorm";
import TokenModel from "../../../models/domain/Token";
import ITokenRepository from "../../ITokenRepository";
import TokenEntity from "../../../models/entity/postgre/TokenEntity";
import TokenMapper from "../../../models/mappers/TokenMapper";
import { ApiError } from "../../../../utils/errors/ApiError";
import { PgDataSource } from "../../../../utils/data/AppDataSource";

class PgTokenRepository implements ITokenRepository {
    private tokenRep: Repository<TokenEntity>

    constructor() {
        this.tokenRep = PgDataSource.getRepository(TokenEntity)
    }

    async getTokens(): Promise<TokenModel[]> {
        const tokens = await this.tokenRep.find()
        const tokenModels = tokens.map(entity => 
            TokenMapper.toDataModel(entity))

        return tokenModels
    }
    async getByUserId(userId: number): Promise<TokenModel> {
        const entity = await this.tokenRep.findOneBy({ user: { id: userId } })
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

        return TokenMapper.toDataModel(entity)
    }
    async create(refreshToken: string, userId: number): Promise<TokenModel> {
        const candidate = await this.tokenRep.findOneBy({ user: { id: userId } })
        if (candidate) {
            return await this.update(candidate.refreshToken, refreshToken)
        }

        const entity = this.tokenRep.create({
            refreshToken,
            user: { id: userId }
        })
        await this.tokenRep.insert(entity)

        return TokenMapper.toDataModel(entity)
    }
    async update(oldRefresh: string, newRefresh: string): Promise<TokenModel> {
        const entity = await this.getByRefreshToken(oldRefresh)
        entity.refreshToken = newRefresh
        
        await this.tokenRep.update(entity.id, entity)
        return entity
    }
    async delete(refreshToken: string): Promise<TokenModel> {
        const entity = await this.tokenRep.findOneBy({ refreshToken })
        if (!entity) {
            throw ApiError.NotFound("Such token was not found")
        }
        
        await this.tokenRep.remove(entity)
        
        return TokenMapper.toDataModel(entity)
    }
}

export default PgTokenRepository