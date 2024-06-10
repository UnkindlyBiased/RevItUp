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
    static createLink(username: string) {
        const symbols = "!:,\"\\/'".split("")
        symbols.forEach(sym => {
            username = username.replace(sym, '')
        })

        return username.toLowerCase()
    }
}

export default UserHelper