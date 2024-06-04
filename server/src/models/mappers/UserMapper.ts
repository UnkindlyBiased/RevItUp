import UserEntity from "../entity/postgre/UserEntity";
import UserCreateDto from "../dto/users/UserCreateDto";
import UserDetailedDto from "../dto/users/UserDetailedDto";
import UserEditDto from "../dto/users/UserEditDto";
import UserShortDto from "../dto/users/UserShortDto";
import UserModel from "../domain/User";
import IDataMapper from "../misc/IDataMapper";
import UserTokenDto from "../dto/users/UserTokenDto";
import CountryMapper from "./CountryMapper";

class UserMapper implements IDataMapper<UserModel, UserEntity> {
    toDataModel(entity: UserEntity): UserModel {
        return {
            ...entity
        }
    }

    mapUserModelToUserShortDto(model: UserModel): UserShortDto {
        return {
            id: model.id,
            username: model.username,
            country: CountryMapper.mapCountryToDto(model.country)
        }
    }
    mapUserModelToUserCreateDto(model: UserModel): UserCreateDto {
        return {
            username: model.username,
            password: model.password,
            emailAddress: model.emailAddress,
            activationLink: model.activationLink,
            countryId: model.country.id
        }
    }
    mapUserModelToUserEditDto(model: UserModel): UserEditDto {
        return {
            username: model.username,
            password: model.password,
            biography: model.biography,
            emailAddress: model.emailAddress,
            isActivated: model.isActivated,
            activationLink: model.activationLink
        }
    }
    mapUserModelToUserDetailedDto(model: UserModel): UserDetailedDto {
        return {
            id: model.id,
            username: model.username,
            emailAddress: model.emailAddress,
            biography: model.biography,
            registrationDate: model.registrationDate,
            isActivated: model.isActivated,
            country: model.country
        }
    }
    mapUserModelToUserTokenDto(model: UserModel): UserTokenDto {
        return {
            id: model.id,
            username: model.username,
            emailAddress: model.emailAddress,
            isActivated: model.isActivated,
            role: model.role
        }
    }
}

export default new UserMapper()