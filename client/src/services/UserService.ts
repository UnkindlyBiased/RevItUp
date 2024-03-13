import { api } from "../http"
import { UserCreate } from "../types/UserCreate"
import { UserShort } from "../types/UserShort"

class UserService {
    private PREFIX = '/users'

    async getUsers(): Promise<UserShort[]> {
        const users = (await api.get<UserShort[]>(this.PREFIX)).data
        return users
    }

    async create(userData: UserCreate) {
        await api.post(this.PREFIX, userData)
        console.log("Done")
    }
}

export default new UserService()