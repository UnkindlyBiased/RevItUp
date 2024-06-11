import { Repository } from "typeorm";
import CountryModel from "../../../models/domain/Country";
import ICountryRepository from "../../ICountryRepository";
import CountryEntity from "../../../models/entity/postgre/CountryEntity";
import { PgDataSource } from "../../../../utils/data/AppDataSource";
import CountryMapper from "../../../models/mappers/CountryMapper";
import { ApiError } from "../../../../utils/errors/ApiError";

class PgCountryRepository implements ICountryRepository {
    private countryRep: Repository<CountryEntity>

    constructor() {
        this.countryRep = PgDataSource.getRepository(CountryEntity)
    }

    async getCountries(): Promise<CountryModel[]> {
        const countries = await this.countryRep.find({
            order: {
                name: 'ASC'
            }
        })
        return countries.map(country => CountryMapper.toDataModel(country))
    }
    async getById(id: number): Promise<CountryModel> {
        const entity = await this.countryRep.findOneBy({ id })
        if (!entity) {
            throw ApiError.NotFound('Such country was not found')
        }

        return CountryMapper.toDataModel(entity)
    }
    async getByCode(code: string): Promise<CountryModel> {
        const country = await this.countryRep.findOneBy({ countryCode: code })
        if (!country) {
            throw ApiError.NotFound("Country with this code was not found")
        }

        return CountryMapper.toDataModel(country)
    }
}

export default PgCountryRepository