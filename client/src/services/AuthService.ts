import { api } from "../api"
import AuthResponse from "../types/data/auth/AuthResponse"
import UserCreate from "../types/data/users/UserCreate"
import UserLogin from "../types/data/users/UserLogin"

class AuthService {
    private ROUTE_PREFIX = '/auth'

    registrate = async (user: UserCreate) => {
        await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/register`, user)
    }
    login = async (data: UserLogin) => {
        return (await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/login`, data)).data
    }
    logout = async () => {
        await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/logout`)
    }
    refresh = async () => {
        return (await api.post<AuthResponse>(`${this.ROUTE_PREFIX}/refresh`)).data
    }
}

export default new AuthService()