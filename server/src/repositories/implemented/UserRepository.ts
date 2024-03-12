import { Repository } from "typeorm"
import { UserEntity } from "../../models/UserEntity"
import PgDataSource from "../../../utils/AppDataSource"
import UserCreateDto from "../../models/dto/UserCreateDto"
import { ApiError } from "../../../utils/ApiError"
import IUserRepository from "../IUserRepository"
import UserEditDto from "../../models/dto/UserEditDto"

class UserRepository implements IUserRepository {
    private readonly userRep: Repository<UserEntity>

    constructor() {
        this.userRep = PgDataSource.getRepository(UserEntity)
    }
    
    async getUsers(): Promise<UserEntity[]> {
        const users = await this.userRep.find()
        return users
    }
    async getUserByName(username: string): Promise<UserEntity> {
        const user = await this.userRep.findOneBy({ username })
        if (!user) {
            throw ApiError.NotFound("User with this name doesn't exist")
        }
        return user
    }
    async getUserById(id: number): Promise<UserEntity> {
        const user = await this.userRep.findOneBy({ id })
        if (!user) {
            throw ApiError.NotFound("User with such ID was not found")
        }
        return user
    }
    async create(candidate: UserCreateDto): Promise<UserEntity> {
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
    async update(id: number, updateData: UserEditDto): Promise<UserEntity> {
        const existingUser = await this.getUserById(id)
        if (!existingUser) {
            throw ApiError.NotFound("No user with such entity was found")
        }
        const updatedUser = this.userRep.create(updateData)
        return await this.userRep.save(updatedUser)
    }
}

export default new UserRepository()