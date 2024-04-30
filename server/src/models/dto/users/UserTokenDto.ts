import UserRoles from "../../../../utils/enums/UserRoles"

export default interface UserTokenDto {
    id: number
    username: string
    emailAddress: string,
    isActivated: boolean,
    role: UserRoles
}