import { useGetUserById } from "@/hooks/useGetUsers"
import useUserStore from "@/store/UserStore"
import UserPage from "../UserPage"
import { useNavigate } from "react-router-dom"

function LoggedUserPage(): React.ReactNode {
    const embedUser = useUserStore(state => state.user)
    const { data: loggedUser, isLoading, error } = useGetUserById(embedUser?.id)
    const navigate = useNavigate()

    if (isLoading) return <p>Is loading...</p>

    if (error) return <p>Error</p>

    if (!loggedUser) {
        navigate('/')
        return <p>Not logged</p>
    }

    return <UserPage user={loggedUser} />
}

export default LoggedUserPage