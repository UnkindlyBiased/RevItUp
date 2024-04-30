import UserCreateDto from "../../src/models/dto/users/UserCreateDto"
import UserEditDto from "../../src/models/dto/users/UserEditDto"

class UserHelper {
    static trimUserData(model: UserCreateDto | UserEditDto): void {
        model.username = model.username.trim()
        model.emailAddress = model.emailAddress.trim()
        if ('biography' in model) {
            model.biography = model.biography.trim()
        }
    }
}

export default UserHelper