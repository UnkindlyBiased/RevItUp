import UserModel from "../../domain/User"

type UserCreateDto = Pick<UserModel, "username" | "password" | "emailAddress" | "activationLink"> & {
    countryId: number
}

export default UserCreateDto