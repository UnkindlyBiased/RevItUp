import { UserEntity } from "../UserEntity";
import UserCreateDto from "../dto/UserCreateDto";
import UserDetailedDto from "../dto/UserDetailedDto";

export class UserMapper {
    static mapUserToUserCreateDto(entity: UserEntity): UserCreateDto {
        return {
            username: entity.username,
            password: entity.password,
            emailAddress: entity.emailAddress
        }
    }
    static mapUserToUserDetailedDto(entity: UserEntity): UserDetailedDto {
        return {
            id: entity.id,
            username: entity.username,
            emailAddress: entity.emailAddress,
            biography: entity.biography,
            registrationDate: entity.registrationDate
        }
    }
}