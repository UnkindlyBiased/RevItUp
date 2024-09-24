import { useMutation } from "@tanstack/react-query"

import AuthService from "../../services/AuthService"
import useUserStore from "../../store/UserStore"

export const useRefresh = () => {
    const setUser = useUserStore(state => state.setUser)
    const setIsAuth = useUserStore(state => state.setIsAuth)
    const setAccessToken = useUserStore(state => state.setAccessToken)

    return useMutation({
        mutationKey: ['refresh'],
        mutationFn: AuthService.refresh,
        onSuccess: (data) => {
            setUser(data.user)
            setIsAuth(true)
            setAccessToken(data.tokens.accessToken)
        }
    })
}