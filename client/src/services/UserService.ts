import UserChangePfp from "@/types/data/users/UserChangePfp"
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
    async getUserByLink(link: string): Promise<UserDetailed> {
        return (await api.get<UserDetailed>(`${this.ROUTE_PREFIX}/${link}`)).data
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
    async changeProfilePicture(input: UserChangePfp): Promise<void> {
        const data = new FormData()

        data.append('id', input.id.toString())
        data.append('pfp', input.image[0])

        await api.patch(this.ROUTE_PREFIX + '/pfp', data)
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