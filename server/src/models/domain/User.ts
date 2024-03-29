import CountryModel from "./Country";

export default interface UserModel {
    id: number,
    username: string,
    password: string,
    biography: string,
    emailAddress: string,
    registrationDate: Date,
    country: CountryModel
}