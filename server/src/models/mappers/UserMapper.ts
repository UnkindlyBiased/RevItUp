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

    toUserShortDto(model: UserModel): UserShortDto {
        return {
            id: model.id,
            username: model.username,
            userLink: model.userLink,
            country: CountryMapper.toDto(model.country)
        }
    }
    toUserCreateDto(model: UserModel): UserCreateDto {
        return {
            username: model.username,
            password: model.password,
            userLink: model.userLink,
            emailAddress: model.emailAddress,
            activationLink: model.activationLink,
            countryId: model.country.id
        }
    }
    toUserEditDto(model: UserModel): UserEditDto {
        return {
            username: model.username,
            password: model.password,
            biography: model.biography,
            emailAddress: model.emailAddress,
            isVerified: model.isVerified,
            activationLink: model.activationLink
        }
    }
    toUserDetailedDto(model: UserModel): UserDetailedDto {
        return {
            id: model.id,
            username: model.username,
            userLink: model.userLink,
            emailAddress: model.emailAddress,
            biography: model.biography,
            registrationDate: model.registrationDate,
            role: model.role,
            pfpLink: model.pfpLink,
            isVerified: model.isVerified,
            country: model.country
        }
    }
    toUserTokenDto(model: UserModel): UserTokenDto {
        return {
            id: model.id,
            username: model.username,
            userLink: model.userLink,
            emailAddress: model.emailAddress,
            isVerified: model.isVerified,
            role: model.role
        }
    }
}

export default new UserMapper()