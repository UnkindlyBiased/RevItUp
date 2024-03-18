import UserModel from "../../src/models/domain/User"
import UserCreateDto from "../../src/models/dto/UserCreateDto"
import UserEditDto from "../../src/models/dto/UserEditDto"

export class UserHelper {
    static trimUserData(model: UserCreateDto | UserEditDto): void {
        model.username = model.username.trim()
        model.emailAddress = model.emailAddress.trim()
        if ('biography' in model) {
            model.biography = model.biography.trim()
        }
    }
}