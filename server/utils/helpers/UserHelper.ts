import UserModel from "../../src/models/domain/User"

export class UserHelper {
    static trimUserData(model: UserModel): void {
        model.username = model.username.trim()
        model.emailAddress = model.emailAddress.trim()
        model.biography = model.biography.trim()
    }
}