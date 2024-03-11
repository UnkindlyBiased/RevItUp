import { ApiError } from "../../utils/ApiError"
import UserCreateDto from "../models/dto/UserCreateDto"
import { UserMapper } from "../models/mappers/UserMapper"
import UserRepository from "../repositories/UserRepository"

class UserService {
    // TODO: create wider DTO for GET
    async getUsers(): Promise<UserCreateDto[]> {
        const users = await UserRepository.getUsers()
        if (!users) {
            throw ApiError.NotFound("Users were not found")
        }
        return users.map(user => {
            return UserMapper.mapUserToUserCreateDto(user)
        })
    }
    async create(candidate: UserCreateDto) {
        const user = await UserRepository.create(candidate)
        return user
    }
}

export default new UserService()