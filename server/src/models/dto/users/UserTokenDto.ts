import UserModel from "../../domain/User"

type UserTokenDto = Pick<UserModel, "id" | "username" | "emailAddress" | "isActivated" | "role">

export default UserTokenDto