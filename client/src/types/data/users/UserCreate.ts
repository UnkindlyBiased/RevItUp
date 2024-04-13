import Country from "../country/Country"

type UserCreate = {
    username: string,
    password: string,
    emailAddress: string,
    country: Country
}

export default UserCreate