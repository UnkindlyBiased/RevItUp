import UserRoles from "./UserRoles"

type UserStore = {
    id: number
    username: string
    userLink: string
    emailAddress: string
    isVerified: boolean
    role: UserRoles
}

export default UserStore