import TokenPairDto from "../../src/models/dto/tokens/TokenPairDto";
import UserTokenDto from "../../src/models/dto/users/UserTokenDto";
import jwt from 'jsonwebtoken'

class TokenHelper {
    static createTokenPair(payload: UserTokenDto): TokenPairDto {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '30d' })

        return {
            accessToken, refreshToken
        } as TokenPairDto
    }
    static validateAccessToken(token: string) {
        try {
            const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
            return tokenData as UserTokenDto
        } catch(e) {
            return null
        }
    }
    static validateRefreshToken(token: string) {
        try {
            const tokenData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
            return tokenData as UserTokenDto
        } catch(e) {
            return null
        }
    }
}

export default TokenHelper