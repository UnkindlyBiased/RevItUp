import { useMutation } from "@tanstack/react-query"

import AuthService from "../../services/AuthService"
import useUserStore from "../../store/UserStore"

export const useLogout = () => {
    const setUser = useUserStore(state => state.setUser)
    const setIsAuth = useUserStore(state => state.setIsAuth)
    const setAccessToken = useUserStore(state => state.setAccessToken)

    return useMutation({
        mutationKey: ['logout'],
        mutationFn: AuthService.logout,
        onSuccess: () => {
            setUser(null)
            setIsAuth(false)
            setAccessToken(null)

            localStorage.removeItem('refreshTokenValid')
        }
    })
}