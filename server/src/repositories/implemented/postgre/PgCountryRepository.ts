import { Repository } from "typeorm";
import CountryModel from "../../../models/domain/Country";
import ICountryRepository from "../../ICountryRepository";
import { CountryEntity } from "../../../models/entity/CountryEntity";
import PgDataSource from "../../../../utils/data/AppDataSource";
import CountryMapper from "../../../models/mappers/CountryMapper";
import { ApiError } from "../../../../utils/errors/ApiError";

class PgCountryRepository implements ICountryRepository {
    private countryRep: Repository<CountryEntity>

    constructor() {
        this.countryRep = PgDataSource.getRepository(CountryEntity)
    }

    async getCountries(): Promise<CountryModel[]> {
        const countries = await this.countryRep.find()
        return countries.map(country => CountryMapper.toDataModel(country))
    }
    async getById(id: number): Promise<CountryModel> {
        throw new Error("Method not implemented.");
    }
    async getByCode(code: string): Promise<CountryModel> {
        const country = await this.countryRep.findOneBy({ 
            countryCode: code
        })
        if (!country) {
            throw ApiError.NotFound("Country with this code was not found")
        }

        return CountryMapper.toDataModel(country)
    }
}

export default new PgCountryRepository()