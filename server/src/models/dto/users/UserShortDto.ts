import UserModel from "../../domain/User";
import CountryDto from "../country/CountryDto";

type UserShort = Pick<UserModel, 'id' | 'username' | 'userLink'> & {
    country: CountryDto
}

export default UserShort