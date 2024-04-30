import CountryModel from "../../domain/Country"

export default interface UserDetailedDto {
    id: number
    username: string
    emailAddress: string
    biography: string
    registrationDate: Date,
    isVerified: boolean,
    country: CountryModel
}