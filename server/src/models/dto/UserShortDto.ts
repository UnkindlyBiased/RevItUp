import CountryModel from "../domain/Country";

export default interface UserShortDto {
    id: number,
    username: string,
    country: CountryModel
}