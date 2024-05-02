import { useGetUserById } from "@/hooks/useGetUsers"
import useUserStore from "@/store/UserStore"
import UserPage from "../UserPage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function LoggedUserPage() {
    const embedUser = useUserStore(state => state.user)
    const { data: loggedUser } = useGetUserById(embedUser?.id)
    const navigate = useNavigate()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!loggedUser) {
                navigate('/login')
            }
        }, 500)

        return () => clearTimeout(timeOut)
    }, [navigate, loggedUser])

    if (loggedUser) return (
        <UserPage user={loggedUser} />
    )
}

export default LoggedUserPage