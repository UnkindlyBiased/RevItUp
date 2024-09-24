import { useMutation } from "@tanstack/react-query";

import AuthService from "../../services/AuthService";
import useUserStore from "../../store/UserStore";

export const useLogin = () => {
    const setAccessToken = useUserStore(state => state.setAccessToken)
    const setUser = useUserStore(state => state.setUser)
    const setIsAuth = useUserStore(state => state.setIsAuth)

    return useMutation({
        mutationKey: ['login'],
        mutationFn: AuthService.login,
        onSuccess: (data) => {
            setIsAuth(true)
            setUser(data.user)
            setAccessToken(data.tokens.accessToken)

            localStorage.setItem('refreshTokenValid', 'true')
        }
    })
}