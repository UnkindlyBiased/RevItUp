import PostPreview from "@/types/data/posts/PostPreview"
import { api } from "../api"
import UserCreate from "../types/data/users/UserCreate"
import UserDetailed from "../types/data/users/UserDetailed"
import UserEdit from "../types/data/users/UserEdit"
import UserShort from "../types/data/users/UserShort"

type UserDeleteRequest = {
    id: number
}

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
        await api.post(this.ROUTE_PREFIX, userData)
    }
    async update(id: number, userData: UserEdit): Promise<void> {
        await api.put<UserUpdateRequest>(this.ROUTE_PREFIX, {
            id,
            username: userData.username,
            password: userData.password,
            emailAddress: userData.emailAddress,
            biography: userData.biography
        })
    }
    async delete(id: number): Promise<void> {
        await api.delete<UserDeleteRequest>(this.ROUTE_PREFIX, {
            data: {
                id
            }
        })
    }
    async getSavedPosts(): Promise<PostPreview[]> {
        return (await api.get<PostPreview[]>(`${this.ROUTE_PREFIX}/saved`)).data
    }
}

export default new UserService()