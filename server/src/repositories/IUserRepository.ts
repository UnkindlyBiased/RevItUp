import UserCreateDto from "../models/dto/users/UserCreateDto";
import UserEditDto from "../models/dto/users/UserEditDto";
import UserModel from "../models/domain/User";
import UserUpdateLightDto from "../models/dto/users/UserUpdateLightDto";

export default interface IUserRepository {
    getUsers: () => Promise<UserModel[]>
    getUserById: (id: number) => Promise<UserModel>
    getUserByLink: (link: string) => Promise<UserModel>
    getUserByName: (username: string) => Promise<UserModel>
    getUserByActivationLink: (activationLink: string) => Promise<UserModel>
    create: (candidate: UserCreateDto) => Promise<UserModel>
    update: (id: number, updateData: UserEditDto) => Promise<UserModel>
    updateLight: (id: number, input: UserUpdateLightDto) => Promise<UserModel>
    changeProfilePicture: (id: number, pfpLink: string) => Promise<void>
    delete: (id: number) => Promise<void>
}