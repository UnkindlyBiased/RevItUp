import UserCreateDto from "../models/dto/UserCreateDto";
import UserEditDto from "../models/dto/UserEditDto";
import UserModel from "../models/domain/User";

export default interface IUserRepository {
    getUsers(): Promise<UserModel[]>
    getUserById(id: number): Promise<UserModel>
    getUserByName(username: string): Promise<UserModel>
    create(candidate: UserCreateDto): Promise<UserModel>
    update(id: number, updateData: UserEditDto): Promise<UserModel>
    delete(id: number): Promise<UserModel>
}