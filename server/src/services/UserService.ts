import { ApiError } from "../../utils/errors/ApiError"
import { UserEntity } from "../models/entity/UserEntity"
import UserCreateDto from "../models/dto/UserCreateDto"
import UserDetailedDto from "../models/dto/UserDetailedDto"
import UserEditDto from "../models/dto/UserEditDto"
import UserShortDto from "../models/dto/UserShortDto"
import UserMapper from "../models/mappers/UserMapper"
import IUserRepository from "../repositories/IUserRepository"
import PgUserRepository from "../repositories/implemented/postgre/PgUserRepository"
import bcrypt from 'bcrypt'

class UserService {
    constructor(private readonly repository: IUserRepository) {}

    // TODO: implement Country entity
    async getUsers(): Promise<UserShortDto[]> {
        console.log("Hiiiii")
        const users = await this.repository.getUsers()
        console.log("after rep call")
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
    async create(candidate: UserCreateDto): Promise<UserCreateDto> {
        const hashPassword = bcrypt.hashSync(candidate.password, 3)

        const user = await this.repository.create({
            username: candidate.username,
            password: hashPassword,
            emailAddress: candidate.emailAddress
        })

        return UserMapper.mapUserModelToUserCreateDto(user)
    }
    async update(id: number, updateData: UserEditDto): Promise<UserDetailedDto> {
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
    async delete(id: number): Promise<UserEntity> {
        const userToRemove = await this.repository.delete(id)
        return userToRemove
    }
}

export default new UserService(PgUserRepository)