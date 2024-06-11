import UserModel from "../../domain/User";

type UserUpdateLightDto = Pick<UserModel, 'username' | 'biography'> & {
    countryId: number
}

export default UserUpdateLightDto