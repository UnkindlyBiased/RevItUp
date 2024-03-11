import { Repository } from "typeorm"
import { UserEntity } from "../models/UserEntity"
import PgDataSource from "../../utils/AppDataSource"

class UserRepository {
    private readonly userRep: Repository<UserEntity>

    constructor() {
        this.userRep = PgDataSource.getRepository(UserEntity)
    }

    async getUsers(): Promise<UserEntity[]> {
        const users = await this.userRep.find()
        return users
    }
}

export default new UserRepository()