import { UserEntity } from "../UserEntity";
import UserCreateDto from "../dto/UserCreateDto";

export class UserMapper {
    static mapUserToUserCreateDto(entity: UserEntity): UserCreateDto {
        return {
            username: entity.username,
            password: entity.password,
            emailAddress: entity.emailAddress
        }
    }
}