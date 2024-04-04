import TokenModel from "../domain/Token";
import { TokenEntity } from "../entity/TokenEntity";
import IDataMapper from "../misc/IDataMapper";

class TokenMapper implements IDataMapper<TokenModel, TokenEntity> {
    toDataModel(entity: TokenEntity): TokenModel {
        return {
            ...entity
        }
    }
    toDataEntity(model: TokenModel): TokenEntity {
        return {
            ...model
        }
    }

}

export default new TokenMapper()