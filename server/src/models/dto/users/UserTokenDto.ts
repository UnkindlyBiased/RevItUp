import UserModel from "../../domain/User"

type UserTokenDto = Pick<UserModel, "id" | "username" | "emailAddress" | "isVerified" | "role" | 'userLink'>

export default UserTokenDto