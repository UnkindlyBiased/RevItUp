import IDataMapper from "../misc/IDataMapper";
import CountryModel from "../domain/Country";
import { CountryEntity } from "../entity/postgre/CountryEntity";

class CountryMapper implements IDataMapper<CountryModel, CountryEntity> {
    toDataModel(entity: CountryEntity): CountryModel {
        return {
            ...entity
        }
    }
}

export default new CountryMapper()