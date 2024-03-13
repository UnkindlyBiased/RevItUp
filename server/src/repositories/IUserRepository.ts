import { UserEntity } from "../models/UserEntity";
import UserCreateDto from "../models/dto/UserCreateDto";
import UserEditDto from "../models/dto/UserEditDto";

// TODO: it is still tightly connected to PostgreSQL (using TypeORM entities), needs creating domain models
export default interface IUserRepository {
    getUsers(): Promise<UserEntity[]>
    getUserById(id: number): Promise<UserEntity>
    getUserByName(username: string): Promise<UserEntity>
    create(candidate: UserCreateDto): Promise<UserEntity>
    update(id: number, updateData: UserEditDto): Promise<UserEntity>
    delete(id: number): Promise<UserEntity>
}