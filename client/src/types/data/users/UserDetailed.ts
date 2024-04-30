import Country from "../country/Country"

type UserDetailed = {
    id: number
    username: string
    emailAddress: string
    biography: string | null
    registrationDate: Date,
    isVerified: boolean,
    country: Country
}

export default UserDetailed