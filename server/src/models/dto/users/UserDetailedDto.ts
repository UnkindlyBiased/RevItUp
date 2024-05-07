import UserModel from "../../domain/User"

type UserDetailedDto = Omit<UserModel, "password" | "activationLink" | "role">

export default UserDetailedDto