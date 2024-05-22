import { useEffect } from "react"

import useUserStore from "@/store/UserStore"

/**
 * Checks if the user is authorized
 */
function AuthProvider({ children }: { children: React.ReactNode }): React.ReactNode {
    const checkAuth = useUserStore(state => state.checkAuth)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [checkAuth])

    return children
}

export default AuthProvider