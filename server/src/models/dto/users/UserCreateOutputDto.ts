import TokenPairDto from "../tokens/TokenPairDto"
import UserTokenDto from "./UserTokenDto"

export default interface UserCreateOutputDto {
    user: UserTokenDto,
    tokens: TokenPairDto
}