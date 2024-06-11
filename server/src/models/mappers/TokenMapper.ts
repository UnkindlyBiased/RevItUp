import TokenModel from "../domain/Token";
import TokenEntity from "../entity/postgre/TokenEntity";
import IDataMapper from "../misc/IDataMapper";

class TokenMapper implements IDataMapper<TokenModel, TokenEntity> {
    toDataModel(entity: TokenEntity): TokenModel {
        return {
            id: entity.id,
            refreshToken: entity.refreshToken
        }
    }
}

export default new TokenMapper()