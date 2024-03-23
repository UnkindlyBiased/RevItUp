import { api } from "../http"
import Country from "../types/country/Country"

class CountryService {
    private PREFIX: string = '/countries'

    async getCountries(): Promise<Country[]> {
        const countries = (await api.get<Country[]>(this.PREFIX)).data
        return countries
    }
    async getCountryByCode(code: string): Promise<Country> {
        const country = (await api.get<Country>(`${this.PREFIX}/${code}`)).data
        return country
    }
}

export default new CountryService()