import { ApiError } from "../../utils/ApiError"
import { UserEntity } from "../models/UserEntity"
import UserCreateDto from "../models/dto/UserCreateDto"
import UserDetailedDto from "../models/dto/UserDetailedDto"
import UserEditDto from "../models/dto/UserEditDto"
import { UserMapper } from "../models/mappers/UserMapper"
import IUserRepository from "../repositories/IUserRepository"
import UserRepository from "../repositories/implemented/UserRepository"
import bcrypt from 'bcrypt'

class UserService {
    constructor(private readonly repository: IUserRepository) {}

    // TODO: create wider DTO for GET
    async getUsers(): Promise<UserCreateDto[]> {
        const users = await this.repository.getUsers()
        if (!users) {
            throw ApiError.NotFound("Users were not found")
        }
        return users.map(user => {
            return UserMapper.mapUserToUserCreateDto(user)
        })
    }
    async getUserByName(username: string): Promise<UserDetailedDto> {
        const user = await this.repository.getUserByName(username)
        return UserMapper.mapUserToUserDetailedDto(user)
    }
    async create(candidate: UserCreateDto): Promise<UserCreateDto> {
        const hashPassword = bcrypt.hashSync(candidate.password, 3)
        const user = await this.repository.create({
            username: candidate.username,
            password: hashPassword,
            emailAddress: candidate.emailAddress
        })
        return UserMapper.mapUserToUserCreateDto(user)
    }
    async update(updateData: UserEditDto): Promise<UserEntity> {
        const existingUser = await this.repository.getUserById(updateData.id)
        const arePasswordsEqual = await bcrypt.compare(updateData.password, existingUser.password)
        if (arePasswordsEqual) {
            updateData.password = existingUser.password
        } else {
            const hashedPassword = await bcrypt.hash(updateData.password, 3)
            updateData.password = hashedPassword
        }
        const updatedUser = await this.repository.update(existingUser.id, updateData)
        return updatedUser
    }
}

export default new UserService(UserRepository)