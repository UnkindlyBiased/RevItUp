import UserModel from "../../domain/User"

type UserCreateDto = Pick<UserModel, "username" | "password" | "emailAddress" | "activationLink" | "country">

export default UserCreateDto