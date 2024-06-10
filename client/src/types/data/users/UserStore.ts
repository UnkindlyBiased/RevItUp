import UserRoles from "./UserRoles"

type UserStore = {
    id: number
    username: string
    userLink: string
    emailAddress: string
    isActivated: boolean
    role: UserRoles
}

export default UserStore