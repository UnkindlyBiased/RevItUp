import { Repository } from "typeorm"
import { UserEntity } from "../models/UserEntity"
import PgDataSource from "../../utils/AppDataSource"
import UserCreateDto from "../models/dto/UserCreateDto"

class UserRepository {
    private readonly userRep: Repository<UserEntity>

    constructor() {
        this.userRep = PgDataSource.getRepository(UserEntity)
    }

    async getUsers() {
        const users: UserCreateDto[] = await this.userRep.find() as UserCreateDto[]
        return users
    }
    async getUserById(id: number) {
        const candidate = await this.userRep.findOneBy({ id })
        if (!candidate) {

        }
    }
}

export default new UserRepository()