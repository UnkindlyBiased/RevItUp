import CountryModel from "../models/domain/Country";
import ICountryRepository from "../repositories/ICountryRepository";
import PgCountryRepository from "../repositories/implemented/postgre/PgCountryRepository";

class CountryService {
    constructor(private repository: ICountryRepository) {  }

    async getCountries(): Promise<CountryModel[]> {
        const countries = await this.repository.getCountries()
        return countries
    }
    async getCountryByCode(code: string): Promise<CountryModel> {
        const country = await this.repository.getByCode(code)
        return country
    }
}

export default new CountryService(PgCountryRepository)