import axios from "axios";

import AuthService from "../services/AuthService";

const BASE_URL = process.env.API_URL

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${accessToken}`
    
    return config
})

api.interceptors.response.use(config => config, async (err) => {
    const originalRequest = err.config

    if (err.response.code === 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true
        
        try {
            const response = await AuthService.refresh()
            localStorage.setItem('token', response.tokens.accessToken)
            return api.request(originalRequest)
        } catch(e) {
            console.log(e)
        }
    }
})