import { api } from "../api"
import Country from "../types/data/country/Country"

class CountryService {
    private ROUTE_PREFIX: string = '/countries'

    async getCountries(): Promise<Country[]> {
        const countries = (await api.get<Country[]>(this.ROUTE_PREFIX)).data
        return countries
    }
    async getCountryByCode(code: string): Promise<Country> {
        const country = (await api.get<Country>(`${this.ROUTE_PREFIX}/${code}`)).data
        return country
    }
}

export default new CountryService()