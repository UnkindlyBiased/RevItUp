import axios from "axios";

import useUserStore from "../store/UserStore";
import AuthResponse from "../types/data/auth/AuthResponse";

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

export const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
})

const onTokenRefreshed = (accessToken: string) => {
    refreshSubscribers.forEach(callback => callback(accessToken))
    refreshSubscribers = []
}

const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback)
}

api.interceptors.request.use(config => {
    const accessToken = useUserStore.getState().accessToken

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
})

api.interceptors.response.use((config) => config,async (err) => {
    const originalRequest = err.config
    const setAccessToken = useUserStore.getState().setAccessToken

    if (err.response.status === 401 && originalRequest) {
        
        isRefreshing = true

        try {
            const { tokens: { accessToken } } = await axios.post<AuthResponse>(process.env.API_URL + '/auth/refresh', {}, {
                withCredentials: true
            }).then(data => data.data)
            setAccessToken(accessToken)

            return api.request(originalRequest)
        } catch (e) {
            console.error('Error while refreshing tokens', e)

            localStorage.removeItem('refreshTokenValid')
            return Promise.reject(e)
        } finally {
            isRefreshing = false
        }
    }

    throw err
})