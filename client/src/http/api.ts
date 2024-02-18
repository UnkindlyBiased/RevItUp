import axios from "axios";

const BASE_URL = String(process.env.API_DEFAULT_LINK)

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: false
})