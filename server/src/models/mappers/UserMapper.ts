import { UserEntity } from "../UserEntity";
import UserCreateDto from "../dto/UserCreateDto";
import UserDetailedDto from "../dto/UserDetailedDto";
import UserEditDto from "../dto/UserEditDto";
import UserShortDto from "../dto/UserShortDto";

export class UserMapper {
    static mapUserToUserShortDto(entity: UserEntity): UserShortDto {
        return {
            id: entity.id,
            username: entity.username
        }
    }
    static mapUserToUserCreateDto(entity: UserEntity): UserCreateDto {
        return {
            username: entity.username,
            password: entity.password,
            emailAddress: entity.emailAddress
        }
    }
    static mapUserToUserEditDto(entity: UserEntity): UserEditDto {
        return {
            username: entity.username,
            password: entity.password,
            biography: entity.biography,
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