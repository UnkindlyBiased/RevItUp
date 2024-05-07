import { create } from "zustand";

import UserCreate from "../types/data/users/UserCreate";
import UserStore from "../types/data/users/UserStore";
import AuthService from "../services/AuthService";

interface UserState {
    user: UserStore | null
    isAuth: boolean
    isLoading: boolean

    setUser: (user: UserStore) => void
    setIsAuth: (value: boolean) => void

    registrate: (data: UserCreate) => void
    login: (username: string, password: string) => void
    logout: () => void
    checkAuth: () => void
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    isAuth: false,
    isLoading: true,

    setUser: (user) => {
        set({ user })
    },
    setIsAuth: (value) => {
        set({ isAuth: value })
    },
    setIsLoading: (value: boolean) => {
        set({ isLoading: value })
    },

    registrate: async (data) => {
        try {
            const response = await AuthService.registrate(data)
            localStorage.setItem("token", response.tokens.accessToken)
        } catch (e) {
            console.log(e)
        }
    },
    login: async (username, password) => {
        try {
            const response = await AuthService.login(username, password)

            localStorage.setItem("token", response.tokens.accessToken)
            set({ user: response.user, isAuth: true })
        } catch(e) {
            console.log(e)
        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        await AuthService.logout()
        localStorage.removeItem('token')

        set({ user: null, isAuth: false })
    },
    checkAuth: async () => {
        try {
            const response = await AuthService.refresh()

            localStorage.setItem('token', response.tokens.accessToken)
            set({ user: response.user, isAuth: true })
        } catch(e) {
            console.log(e)
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useUserStore