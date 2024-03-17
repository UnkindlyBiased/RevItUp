import { UserEntity } from "../entity/UserEntity";
import UserCreateDto from "../dto/UserCreateDto";
import UserDetailedDto from "../dto/UserDetailedDto";
import UserEditDto from "../dto/UserEditDto";
import UserShortDto from "../dto/UserShortDto";
import UserModel from "../domain/User";
import IDataMapper from "../IDataMapper";

class UserMapper implements IDataMapper<UserModel, UserEntity> {
    toDataModel(entity: UserEntity): UserModel {
        return {
            id: entity.id,
            username: entity.username,
            password: entity.password,
            biography: entity.biography,
            emailAddress: entity.emailAddress,
            registrationDate: entity.registrationDate
        }
    }
    toDataEntity(model: UserModel): UserEntity {
        return {
            ...model
        }
    }

    mapUserModelToUserShortDto(model: UserModel): UserShortDto {
        return {
            id: model.id,
            username: model.username
        }
    }
    mapUserModelToUserCreateDto(model: UserModel): UserCreateDto {
        return {
            username: model.username,
            password: model.password,
            emailAddress: model.emailAddress
        }
    }
    mapUserModelToUserEditDto(model: UserModel): UserEditDto {
        return {
            username: model.username,
            password: model.password,
            biography: model.biography,
            emailAddress: model.emailAddress
        }
    }
    mapUserModelToUserDetailedDto(model: UserModel): UserDetailedDto {
        return {
            id: model.id,
            username: model.username,
            emailAddress: model.emailAddress,
            biography: model.biography,
            registrationDate: model.registrationDate
        }
    }
}

export default new UserMapper()