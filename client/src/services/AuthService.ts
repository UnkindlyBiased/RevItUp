import { api } from "../api"
import AuthResponse from "../types/data/auth/AuthResponse"
import UserCreate from "../types/data/users/UserCreate"

class AuthService {
    private ROUTE_PREFIX = '/auth'

    async registrate(user: UserCreate) {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/register`, { 
            ...user
        })
        return response.data
    }
    async login(username: string, password: string) {
        const response = await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/login`, { username, password })
        return response.data
    }
    async logout() {
        await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/logout`)
    }
    async refresh() {
        const response = await api.get<AuthResponse>(`${this.ROUTE_PREFIX}/refresh`)
        return response.data
    }
}

export default new AuthService()