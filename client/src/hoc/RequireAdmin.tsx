import Forbidden from "@/components/generic/boundaries/Forbidden";
import useUserStore from "@/store/UserStore";

function RequireAdmin({ children }: { children: React.ReactNode }): React.ReactNode {
    const user = useUserStore(state => state.user)

    if (user?.role !== 'admin') return <Forbidden />

    return children
}

export default RequireAdmin