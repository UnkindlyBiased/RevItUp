import Forbidden from "@/components/generic/boundaries/Forbidden";
import useUserStore from "@/store/UserStore";
import ChildProp from "@/types/page/ChildProp";

function RequireRole({ children }: ChildProp): React.ReactNode {
    const user = useUserStore(state => state.user)

    if (user?.role !== 'writer' && user?.role !== "admin") return <Forbidden />

    return children
}

export default RequireRole