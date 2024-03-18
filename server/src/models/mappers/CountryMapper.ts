import IDataMapper from "../IDataMapper";
import CountryModel from "../domain/Country";
import { CountryEntity } from "../entity/CountryEntity";

class CountryMapper implements IDataMapper<CountryModel, CountryEntity> {
    toDataModel(entity: CountryEntity): CountryModel {
        return {
            ...entity
        }
    }
    toDataEntity(model: CountryModel): CountryEntity {
        return {
            ...model
        }
    }
}

export default new CountryMapper()