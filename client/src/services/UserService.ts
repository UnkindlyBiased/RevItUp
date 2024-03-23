import { api } from "../http"
import { UserCreate } from "../types/users/UserCreate"
import { UserDetailed } from "../types/users/UserDetailed"
import { UserEdit } from "../types/users/UserEdit"
import { UserShort } from "../types/users/UserShort"

type UserDeleteRequest = {
    id: number
}

type UserUpdateRequest = {
    id: number,
    editData: UserEdit
}

class UserService {
    private PREFIX = '/users'

    async getUsers(): Promise<UserShort[]> {
        const users = (await api.get<UserShort[]>(this.PREFIX)).data
        return users
    }
    async getUserByUsername(username: string): Promise<UserDetailed> {
        const userPath = `${this.PREFIX}/${username}`
        const user = (await api.get<UserDetailed>(userPath)).data
        return user
    }
    async create(userData: UserCreate) {
        await api.post(this.PREFIX, userData)
        console.log("Done")
    }
    async update(id: number, userData: UserEdit) {
        await api.put<UserUpdateRequest>(this.PREFIX, {
            id,
            username: userData.username,
            password: userData.password,
            emailAddress: userData.emailAddress,
            biography: userData.biography
        })
    }
    async delete(id: number) {
        await api.delete<UserDeleteRequest>(this.PREFIX, {
            data: {
                id
            }
        })
    }
}

export default new UserService()