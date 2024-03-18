import CountryModel from "../models/domain/Country";

export default interface ICountryRepository {
    getCountries(): Promise<CountryModel[]>
    getById(id: number): Promise<CountryModel>
}