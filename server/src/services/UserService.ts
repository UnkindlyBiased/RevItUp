import { ApiError } from "../../utils/errors/ApiError"
import UserCreateDto from "../models/dto/users/UserCreateDto"
import UserDetailedDto from "../models/dto/users/UserDetailedDto"
import UserEditDto from "../models/dto/users/UserEditDto"
import UserShortDto from "../models/dto/users/UserShortDto"
import UserMapper from "../models/mappers/UserMapper"
import IUserRepository from "../repositories/IUserRepository"
import PgUserRepository from "../repositories/implemented/postgre/PgUserRepository"
import bcrypt from 'bcrypt'
import UserModel from "../models/domain/User"
import UserHelper from "../../utils/helpers/UserHelper"
import { v4 } from 'uuid'
import MailService from "./MailService"
import UserTokenDto from "../models/dto/users/UserTokenDto"
import TokenHelper from "../../utils/helpers/TokenHelper"
import TokenService from "./TokenService"
import UserCreateOutputDto from "../models/dto/users/UserCreateOutputDto"

class UserService {
    constructor(private readonly repository: IUserRepository) {}

    // * CRUD work
    async getUsers(): Promise<UserShortDto[]> {
        const users = await this.repository.getUsers()
        if (!users) {
            throw ApiError.NotFound("Users were not found")
        }

        return users.map(user => {
            return UserMapper.mapUserModelToUserShortDto(user)
        })
    }
    async getUserByName(username: string): Promise<UserDetailedDto> {
        const user = await this.repository.getUserByName(username)
        return UserMapper.mapUserModelToUserDetailedDto(user)
    }
    async register(candidate: UserCreateDto): Promise<UserCreateOutputDto> {
        UserHelper.trimUserData(candidate)

        const hashPassword = bcrypt.hashSync(candidate.password, 3)
        const activationLink = v4()

        const user = await this.repository.create({
            username: candidate.username,
            password: hashPassword,
            emailAddress: candidate.emailAddress,
            activationLink,
            country: candidate.country
        })
        // await MailService.sendActivationMail(candidate.emailAddress, '')

        const dto: UserTokenDto = {
            id: user.id,
            username: candidate.username,
            emailAddress: candidate.emailAddress,
            isActivated: false
        }
        const tokens = TokenHelper.createTokenPair(dto)
        await TokenService.saveToken(dto.id, tokens.refreshToken)

        return {
            id: dto.id,
            username: dto.username,
            emailAddress: dto.emailAddress,
            tokens
        } as UserCreateOutputDto
    }
    async update(id: number, updateData: UserEditDto): Promise<UserDetailedDto> {
        UserHelper.trimUserData(updateData)

        const existingUser = await this.repository.getUserById(id)

        const arePasswordsEqual = await bcrypt.compare(updateData.password, existingUser.password)
        if (arePasswordsEqual) {
            updateData.password = existingUser.password
        } else {
            const hashedPassword = await bcrypt.hash(updateData.password, 3)
            updateData.password = hashedPassword
        }

        const updatedUser = await this.repository.update(id, updateData)
        return UserMapper.mapUserModelToUserDetailedDto(updatedUser)
    }
    async delete(id: number): Promise<UserModel> {
        const userToRemove = await this.repository.delete(id)
        return userToRemove
    }

    async activate(activationLink: string): Promise<UserEditDto> {
        const user = await this.repository.getUserByActivationLink(activationLink)
        const dto: UserEditDto = { ...user }

        if (dto.activationLink) {
            dto.isActivated = true
            dto.activationLink = null
        }

        await this.repository.update(user.id, dto)

        return dto
    }
}

export default new UserService(PgUserRepository)