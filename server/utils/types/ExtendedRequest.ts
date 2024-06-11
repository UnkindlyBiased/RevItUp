import UserTokenDto from "../../src/models/dto/users/UserTokenDto";

declare module 'express-serve-static-core' {
    export interface Request {
        user: UserTokenDto
    }
}