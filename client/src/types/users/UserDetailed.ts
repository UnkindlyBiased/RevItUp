import Country from "../country/Country"

type UserDetailed = {
    id: number
    username: string
    emailAddress: string
    biography: string
    registrationDate: string,
    country: Country
}

export default UserDetailed