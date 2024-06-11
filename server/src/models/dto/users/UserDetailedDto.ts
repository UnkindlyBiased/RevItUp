import UserModel from "../../domain/User"

type UserDetailedDto = Omit<UserModel, "password" | "activationLink">

export default UserDetailedDto