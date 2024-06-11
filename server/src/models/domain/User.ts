import UserRoles from "../../../utils/enums/UserRoles";
import CountryModel from "./Country";

export default interface UserModel {
    id: number,
    username: string,
    password: string,
    userLink: string,
    biography: string,
    emailAddress: string,
    registrationDate: Date,
    pfpLink?: string | null
    isVerified: boolean,
    activationLink?: string | null,
    role: UserRoles,
    country: CountryModel
}