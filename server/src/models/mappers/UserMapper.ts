import { UserEntity } from "../entity/UserEntity";
import UserCreateDto from "../dto/users/UserCreateDto";
import UserDetailedDto from "../dto/users/UserDetailedDto";
import UserEditDto from "../dto/users/UserEditDto";
import UserShortDto from "../dto/users/UserShortDto";
import UserModel from "../domain/User";
import IDataMapper from "../misc/IDataMapper";

class UserMapper implements IDataMapper<UserModel, UserEntity> {
    toDataModel(entity: UserEntity): UserModel {
        return {
            ...entity
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
            username: model.username,
            country: model.country
        }
    }
    mapUserModelToUserCreateDto(model: UserModel): UserCreateDto {
        return {
            username: model.username,
            password: model.password,
            emailAddress: model.emailAddress,
            activationLink: model.activationLink,
            country: model.country
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
            registrationDate: model.registrationDate,
            country: model.country
        }
    }
}

export default new UserMapper()