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
        await MailService.sendActivationMail(candidate.emailAddress, 
            `http://localhost:8008/users/activate/${activationLink}`)

        return await this.generateDtoWithTokens(user)
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

    async login(username: string, password: string): Promise<UserCreateOutputDto> {
        const user = await this.repository.getUserByName(username)
        
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            throw ApiError.Conflict('Passwords are not equal')
        }

        return await this.generateDtoWithTokens(user)
    }
    async logout(refreshToken: string) {
        const token = TokenService.removeToken(refreshToken)
        return token
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
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.Unauthorized('Refresh token is not valid')
        }

        const userData = TokenHelper.validateRefreshToken(refreshToken)

        const tokenEntity = await TokenService.getByRefreshToken(refreshToken)

        if (!userData || !tokenEntity) {
            throw ApiError.Unauthorized('User is unauthorized')
        }

        const user = await this.repository.getUserById(userData.id)
        if (!user) {
            throw ApiError.NotFound('User was not found')
        }

        return await this.generateDtoWithTokens(user)
    }

    private async generateDtoWithTokens(user: UserModel): Promise<UserCreateOutputDto> {
        const dto: UserTokenDto = {
            ...user
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
}

export default new UserService(PgUserRepository)