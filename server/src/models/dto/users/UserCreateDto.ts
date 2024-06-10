import UserModel from "../../domain/User"

type UserCreateDto = Pick<UserModel, "username" | "password" | "emailAddress" | "activationLink" | 'userLink'> & {
    countryId: number
}

export default UserCreateDto