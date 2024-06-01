import { useDocumentTitle } from "@uidotdev/usehooks"

import LoginForm from "@/components/pages/login-page/LoginForm"
import useUserStore from "@/store/UserStore"

function LoginPage(): React.ReactNode {
    useDocumentTitle('REVITUP: User login')
    
    const isAuth = useUserStore(state => state.isAuth)

    return (
        isAuth ? <span className="text-xl m-4">You are already logined</span> : <LoginForm />
    )
}

export default LoginPage