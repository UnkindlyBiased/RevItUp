import { Repository } from "typeorm"
import { UserEntity } from "../models/UserEntity"
import PgDataSource from "../../utils/AppDataSource"
import UserCreateDto from "../models/dto/UserCreateDto"
import { ApiError } from "../../utils/ApiError"

class UserRepository {
    private readonly userRep: Repository<UserEntity>

    constructor() {
        this.userRep = PgDataSource.getRepository(UserEntity)
    }

    async getUsers(): Promise<UserEntity[]> {
        const users = await this.userRep.find()
        return users
    }
    // TODO: learn more about Record<K, V>
    async findUserByCriteria(crit: Record<string, any>) {
        const user = this.userRep.findOneBy(crit)
        if (!user) {
            throw ApiError.NotFound("No such user was found")
        }
        return user
    }
    async create(candidate: UserCreateDto): Promise<UserCreateDto> {
        const user = await this.userRep.findOne({
            where: [
                { username: candidate.username },
                { emailAddress: candidate.emailAddress }
            ]
        })
        if (user) {
            throw ApiError.Conflict('User with this bio already exists')
        }
        const newUser = await this.userRep.save(candidate)
        return newUser
    }
}

export default new UserRepository()