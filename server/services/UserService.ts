import { Repository } from "typeorm";
import { UserEntity } from "../models/UserEntity";
import PgDataSource from "../utils/PgDataSource";
import { PostEntity } from "../models/PostEntity";

class UserService {
    private userRepository: Repository<UserEntity>

    constructor() {
        this.userRepository = PgDataSource.getRepository(UserEntity)
    }

    async getUsers() {
        const users = await this.userRepository.find()
        return users
    }
    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({
            id: id
        })
        return user
    }
    async addUser(user: UserEntity) {
        await this.userRepository.save(user)
        return user
    }
}

export default new UserService()