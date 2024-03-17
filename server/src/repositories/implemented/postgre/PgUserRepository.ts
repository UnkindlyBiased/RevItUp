import { Repository } from "typeorm"
import { UserEntity } from "../../../models/entity/UserEntity"
import PgDataSource from "../../../../utils/data/AppDataSource"
import UserCreateDto from "../../../models/dto/UserCreateDto"
import { ApiError } from "../../../../utils/errors/ApiError"
import IUserRepository from "../../IUserRepository"
import UserEditDto from "../../../models/dto/UserEditDto"
import UserMapper from "../../../models/mappers/UserMapper"
import UserModel from "../../../models/domain/User"

class PgUserRepository implements IUserRepository {
    private readonly userRep: Repository<UserEntity>

    constructor() {
        this.userRep = PgDataSource.getRepository(UserEntity)
    }
    
    async getUsers(): Promise<UserModel[]> {
        const users = await this.userRep.find()
        return users.map(user => UserMapper.toDataModel(user))
    }
    async getUserById(id: number): Promise<UserModel> {
        const user = await this.userRep.findOneBy({ id })
        if (!user) {
            throw ApiError.NotFound("User with such ID was not found")
        }
        return UserMapper.toDataModel(user)
    }
    async getUserByName(username: string): Promise<UserModel> {
        const user = await this.userRep.findOneBy({ username })
        if (!user) {
            throw ApiError.NotFound("User with this name doesn't exist")
        }
        return UserMapper.toDataModel(user)
    }
    async create(candidate: UserCreateDto): Promise<UserModel> {
        const user = await this.userRep.findOne({
            where: [
                { username: candidate.username },
                { emailAddress: candidate.emailAddress }
            ]
        })
        if (user) {
            throw ApiError.Conflict('User with this bio already exists')
        }
        const newUser = this.userRep.create(candidate)
        await this.userRep.save(newUser)

        return UserMapper.toDataModel(newUser)
    }
    // TODO: clean up this mess, figure out with updates and UNIQUE on emails
    async update(id: number, updateData: UserEditDto): Promise<UserModel> {
        const existingUser = await this.getUserById(id)
        if (!existingUser) {
            throw ApiError.NotFound("No user by such data was found")
        }
        const updatedUser = this.userRep.create({
            id: id,
            ...updateData
        })
        await this.userRep.save(updatedUser)
        return UserMapper.toDataModel(updatedUser)
    }
    async delete(id: number): Promise<UserModel> {
        const user = await this.userRep.findOneBy({id})
        if (!user) {
            throw ApiError.NotFound("User with such ID was not found")
        }
        await this.userRep.remove(user)
        return UserMapper.toDataModel(user)
    }
}

export default new PgUserRepository()