import { api } from "../api"
import UserCreate from "../types/data/users/UserCreate"
import UserDetailed from "../types/data/users/UserDetailed"
import UserEdit from "../types/data/users/UserEdit"
import UserShort from "../types/data/users/UserShort"

type UserUpdateRequest = {
    id: number,
    editData: UserEdit
}

class UserService {
    private ROUTE_PREFIX = '/users'

    async getUsers(): Promise<UserShort[]> {
        const users = (await api.get<UserShort[]>(this.ROUTE_PREFIX)).data
        return users
    }
    async getUserByUsername(username: string): Promise<UserDetailed> {
        const userPath = `${this.ROUTE_PREFIX}/${username}`
        const user = (await api.get<UserDetailed>(userPath)).data
        return user
    }
    async getUserById(id: number) {
        return (await api.get<UserDetailed>(this.ROUTE_PREFIX + `/by-id/${id}`)).data
    }
    async create(userData: UserCreate): Promise<void> {
        await api.post('/auth/register', userData)
    }
    async update(id: number, userData: UserEdit): Promise<void> {
        await api.put<UserUpdateRequest>(this.ROUTE_PREFIX, {
            id,
            ...userData
        })
    }
    async delete(id: number): Promise<void> {
        await api.delete(this.ROUTE_PREFIX, {
            data: {
                id
            }
        })
    }
}

export default new UserService()