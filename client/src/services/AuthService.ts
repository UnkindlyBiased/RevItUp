import { authApi } from "../api"
import AuthResponse from "../types/data/auth/AuthResponse"
import UserCreate from "../types/data/users/UserCreate"

class AuthService {
    async registrate(user: UserCreate) {
        const response = await authApi.post<AuthResponse>('/register', { 
            ...user
        })

        return response.data
    }
    async login(username: string, password: string) {
        const response = await authApi.post<AuthResponse>('/login', { username, password })
        return response.data
    }
    async logout() {
        await authApi.post<AuthResponse>('/logout')
    }
    async refresh() {
        const response = await authApi.get<AuthResponse>('/refresh')
        return response.data
    }
}

export default new AuthService()