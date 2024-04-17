import IDataMapper from "../misc/IDataMapper";
import CountryModel from "../domain/Country";
import { CountryEntity } from "../entity/postgre/CountryEntity";
import CountryDto from "../dto/country/CountryDto";

class CountryMapper implements IDataMapper<CountryModel, CountryEntity> {
    toDataModel(entity: CountryEntity): CountryModel {
        return {
            ...entity
        }
    }
    
    mapCountryToDto(model: CountryModel): CountryDto {
        return {
            name: model.name,
            flagImgLink: model.flagImgLink
        }
    }
}

export default new CountryMapper()