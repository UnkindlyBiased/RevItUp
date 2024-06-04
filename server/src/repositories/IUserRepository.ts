import UserCreateDto from "../models/dto/users/UserCreateDto";
import UserEditDto from "../models/dto/users/UserEditDto";
import UserModel from "../models/domain/User";

export default interface IUserRepository {
    getUsers(): Promise<UserModel[]>
    getUserById(id: number): Promise<UserModel>
    getUserByName(username: string): Promise<UserModel>
    getUserByActivationLink: (activationLink: string) => Promise<UserModel>
    create(candidate: UserCreateDto): Promise<UserModel>
    update(id: number, updateData: UserEditDto): Promise<UserModel>
    delete(id: number): Promise<void>
}