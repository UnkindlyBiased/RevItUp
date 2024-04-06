import { authApi } from "../api"
import AuthResponse from "../types/auth/AuthResponse"
import UserCreate from "../types/users/UserCreate"

class AuthService {
    async registrate(user: UserCreate) {
        const response = await authApi.post<AuthResponse>('/register', { 
            username: user.username,
            password: user.password,
            emailAddress: user.emailAddress,
            country: user.country,
        })

        return response.data
    }
    async login(email: string, password: string) {
        const response = await authApi.post<AuthResponse>('/login', { email, password })
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