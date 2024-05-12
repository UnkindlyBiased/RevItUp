import CountryModel from "../models/domain/Country";
import ICountryRepository from "../repositories/ICountryRepository";
import PgCountryRepository from "../repositories/implemented/postgre/PgCountryRepository";

class CountryService {
    constructor(private repository: ICountryRepository) {  }

    async getCountries(): Promise<CountryModel[]> {
        return this.repository.getCountries()
    }
    async getCountryById(id: number): Promise<CountryModel> {
        return this.repository.getById(id)
    }
    async getCountryByCode(code: string): Promise<CountryModel> {
        return this.repository.getByCode(code)
    }
}

export default new CountryService(PgCountryRepository)