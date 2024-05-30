import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUserStore from "@/store/UserStore";
import ChildProp from "@/types/page/ChildProp";

function RequireAuth({ children }: ChildProp): React.ReactNode {
    const isAuth = useUserStore(state => state.isAuth)
    const isLoading = useUserStore(state => state.isLoading)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate('/login')
        }
    }, [isLoading, isAuth, navigate])

    if (!isAuth) {
        return null // Alternatively, you can keep showing the loading indicator here as well
    }

    return children
}

export default RequireAuth