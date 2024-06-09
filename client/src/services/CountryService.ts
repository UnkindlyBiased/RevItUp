import { api } from "../api"
import Country from "../types/data/country/Country"

class CountryService {
    private ROUTE_PREFIX: string = '/countries'

    async getCountries(): Promise<Country[]> {
        return (await api.get<Country[]>(this.ROUTE_PREFIX)).data
    }
    async getCountryByCode(code: string): Promise<Country> {
        return (await api.get<Country>(`${this.ROUTE_PREFIX}/${code}`)).data
    }
}

export default new CountryService()