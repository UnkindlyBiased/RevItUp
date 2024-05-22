import { useGetUserById } from "@/hooks/useGetUsers"
import useUserStore from "@/store/UserStore"
import UserPage from "../UserPage"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function LoggedUserPage(): React.ReactNode {
    const embedUser = useUserStore(state => state.user)
    const { data: loggedUser, isLoading, error } = useGetUserById(embedUser?.id)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser) {
            navigate('/')
        }
    }, [navigate, loggedUser])

    if (isLoading || !loggedUser) return <p>Is loading...</p>

    if (error) return <p>Error</p>

    return <UserPage user={loggedUser} />
}

export default LoggedUserPage