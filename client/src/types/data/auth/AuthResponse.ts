import UserStore from "../users/UserStore"
import TokenPairDto from "./TokenPairDto"

type AuthResponse = {
    user: UserStore,
    tokens: TokenPairDto
}

export default AuthResponse