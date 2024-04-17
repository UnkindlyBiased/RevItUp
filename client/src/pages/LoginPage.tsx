import LoginForm from "@/components/pages/login-page/LoginForm"
import useUserStore from "@/store/UserStore"
import { useDocumentTitle } from "@uidotdev/usehooks"

function LoginPage(): React.ReactNode {
    const isAuth = useUserStore(state => state.isAuth)

    useDocumentTitle('REVITUP: User login')

    return (
        <>
            { isAuth ? <span className="text-xl m-4">You are already logined</span> : <LoginForm /> }
        </>
    )
}

export default LoginPage