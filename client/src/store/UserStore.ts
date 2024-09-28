import { create } from "zustand";

import UserCreate from "../types/data/users/UserCreate";
import UserStore from "../types/data/users/UserStore";
import AuthService from "../services/AuthService";

/**
 * Type with definitons of properties and methods for logined user
 */
type UserState = {
    user: UserStore | null
    accessToken: string | null

    isAuth: boolean
    isLoading: boolean

    setUser: (user: UserStore | null) => void
    setAccessToken: (token: string | null) => void
    setIsAuth: (value: boolean) => void

    registrate: (data: UserCreate) => void
    login: (username: string, password: string) => void
    logout: () => void
    checkAuth: () => void
}

/** 
 * A store which contains the data about the user, loading states
 * and methods that are needed for work with user (created with Zustand)
 */
const useUserStore = create<UserState>((set) => ({
    user: null,
    accessToken: null,

    isAuth: false,
    isLoading: true,

    setUser: (user) => {
        set({ user })
    },
    setAccessToken: (token) => {
        set({ accessToken: token })
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
            
            
        } catch (e) {
            console.log(e)
        }
    },
    login: async (username, password) => {
        try {
            const response = await AuthService.login({ username, password })

            localStorage.setItem("accessToken", response.tokens.accessToken)
            set({ user: response.user, isAuth: true })
        } catch(e) {
            console.log(e)
        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        await AuthService.logout()
        localStorage.removeItem('accessToken')

        set({ user: null, isAuth: false })
    },
    checkAuth: async () => {
        try {
            const response = await AuthService.refresh()

            localStorage.setItem('accessToken', response.tokens.accessToken)
            set({ user: response.user, isAuth: true })
        } catch(e) {
            console.log(e)
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useUserStore