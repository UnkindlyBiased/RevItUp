import UserModel from "./User"

export default interface CountryModel {
    id: number, 
    name: string,
    countryCode: string, 
    flagImgLink: string,
    users: UserModel[]
}