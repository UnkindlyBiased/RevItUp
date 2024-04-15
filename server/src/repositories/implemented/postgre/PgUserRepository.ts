import { Repository } from "typeorm"
import { UserEntity } from "../../../models/entity/postgre/UserEntity"
import { PgDataSource } from "../../../../utils/data/AppDataSource"
import UserCreateDto from "../../../models/dto/users/UserCreateDto"
import { ApiError } from "../../../../utils/errors/ApiError"
import IUserRepository from "../../IUserRepository"
import UserEditDto from "../../../models/dto/users/UserEditDto"
import UserMapper from "../../../models/mappers/UserMapper"
import UserModel from "../../../models/domain/User"

class PgUserRepository implements IUserRepository {
    private readonly userRep: Repository<UserEntity>

    constructor() {
        this.userRep = PgDataSource.getRepository(UserEntity)
    }
    
    async getUsers(): Promise<UserModel[]> {
        const users = await this.userRep.find({
            relations: ['country']
        })

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
        const user = await this.userRep.findOne({
            where: { username },
            relations: ['country']
        })
        if (!user) {
            throw ApiError.NotFound("User with this name doesn't exist")
        }
        
        return UserMapper.toDataModel(user)
    }
    async getUserByActivationLink(activationLink: string): Promise<UserModel> {
        const entity = await this.userRep.findOneBy({ activationLink })
        if (!entity) {
            throw ApiError.NotFound("Either this link doesn't exist or this user is already activated")
        }
        
        return UserMapper.toDataModel(entity)
    }
    async create(candidate: UserCreateDto): Promise<UserModel> {
        const user = await this.userRep.findOne({
            where: [
                { username: candidate.username },
                { emailAddress: candidate.emailAddress }
            ],
            relations: ['country']
        })

        if (user) {
            throw ApiError.Conflict("This user's data already exists")
        }
        const newUser = this.userRep.create(candidate)
        
        await this.userRep.insert(newUser)

        await PgDataSource.queryResultCache?.remove(['users'])

        return UserMapper.toDataModel(newUser)
    }
    async update(id: number, updateData: UserEditDto): Promise<UserModel> {
        const existingUser = await this.getUserById(id)
        if (!existingUser) {
            throw ApiError.NotFound("No user by such data was found")
        }

        const updatedUser = this.userRep.create({
            id: id,
            ...updateData
        })
        
        await this.userRep.update(updatedUser.id, updatedUser)
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