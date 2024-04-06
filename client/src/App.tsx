import { useEffect } from "react"
import useUserStore from "./store"
import LoginForm from "./components/LoginForm"

function App() {
  const user = useUserStore((state) => state.user)
    const logout = useUserStore((state) => state.logout)
    const checkAuth = useUserStore((state) => state.checkAuth)
    const isLoading = useUserStore((state) => state.isLoading)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [checkAuth])

    if (isLoading) {
        return (
            <div>Is loading</div>
        )
    }

    if (!user) {
        return (
            <LoginForm />
        )
    }

    return (
        <>
            <div className='flex flex-col items-center space-y-5'>
                <span className='text-2xl font-bold'>
                    User with email {user.emailAddress}
                </span>
                <button className='size-fit' onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default App
