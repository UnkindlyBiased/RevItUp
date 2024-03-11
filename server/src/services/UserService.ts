import { ApiError } from "../../utils/ApiError"
import UserRepository from "../repositories/UserRepository"

class UserService {
    async getUsers() {
        const users = await UserRepository.getUsers()
        if (!users) {
            throw ApiError.NotFound("Users were not found")
        }
        return users
    }
}

export default new UserService()