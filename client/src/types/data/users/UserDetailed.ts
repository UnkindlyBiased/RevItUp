import Country from "../country/Country"
import UserRoles from "./UserRoles"

type UserDetailed = {
    id: number
    username: string
    userLink: string
    emailAddress: string
    biography: string | null
    registrationDate: Date
    pfpLink: string | null
    isVerified: boolean
    role: UserRoles
    country: Country
}

export default UserDetailed