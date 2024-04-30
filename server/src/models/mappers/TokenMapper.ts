import TokenModel from "../domain/Token";
import { TokenEntity } from "../entity/postgre/TokenEntity";
import IDataMapper from "../misc/IDataMapper";

class TokenMapper implements IDataMapper<TokenModel, TokenEntity> {
    toDataModel(entity: TokenEntity): TokenModel {
        return {
            ...entity
        }
    }

}

export default new TokenMapper()