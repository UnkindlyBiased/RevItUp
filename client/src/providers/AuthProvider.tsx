import { useEffect } from "react"

import { useRefresh } from "../hooks/auth/useRefresh"

/**
 * Checks if the user is authorized
 */
function AuthProvider({ children }: { children: React.ReactNode }): React.ReactNode {
    const { mutateAsync } = useRefresh()
    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem('refreshTokenValid')) {
                await mutateAsync()
            }
        }

        checkAuth()
    }, [mutateAsync])

    return children
}

export default AuthProvider