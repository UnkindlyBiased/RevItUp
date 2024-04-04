import TokenPairDto from "../tokens/TokenPairDto"

export default interface UserCreateOutputDto {
    id: number
    username: string
    emailAddress: string
    tokens: TokenPairDto
}