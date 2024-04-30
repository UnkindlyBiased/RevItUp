import { useGetUserById } from "@/hooks/useGetUsers"
import useUserStore from "@/store/UserStore"
import UserPage from "../UserPage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function LoggedUserPage() {
    const embedUser = useUserStore(state => state.user)
    const { data: loggedUser, fetchStatus } = useGetUserById(embedUser?.id)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchStatus === 'idle' && !loggedUser) {
            navigate('/login')
        }  
    }, [navigate, fetchStatus, loggedUser])

    if (loggedUser) return (
        <UserPage user={loggedUser} />
    )
}

export default LoggedUserPage