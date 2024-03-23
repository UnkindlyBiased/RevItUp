import CountryModel from "../domain/Country"

export default interface UserCreateDto {
    username: string
    password: string
    emailAddress: string,
    country: CountryModel
}