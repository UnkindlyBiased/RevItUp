import UserModel from "./User"

export default interface CountryModel {
    id: number, 
    name: string,
    shortenedName: string, 
    flagImgLink: string,
    users: UserModel[]
}