import UserDetailed from "./UserDetailed";

type UserUpdateLight = Pick<UserDetailed, 'biography' | 'username'> & {
    countryId: string
}

export default UserUpdateLight