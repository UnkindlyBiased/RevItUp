import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { useGetUserById } from "@/hooks/useGetUsers"
import useUserStore from "@/store/UserStore"
import UserPage from "../UserPage"
import AppRoutes from "@/utils/enums/AppRoutes"

function LoggedUserPage(): React.ReactNode {
    const embedUser = useUserStore(state => state.user)
    const { data: loggedUser, isLoading, error, isFetched } = useGetUserById(embedUser?.id)
    const navigate = useNavigate()

    useEffect(() => {
        if (isFetched && !loggedUser) {
            navigate(AppRoutes.LOGIN)
        }
    }, [navigate, loggedUser, isFetched])

    if (isLoading || !loggedUser) return <p>Is loading...</p>

    if (error) return <p>Error</p>

    return <UserPage user={loggedUser} />
}

export default LoggedUserPage