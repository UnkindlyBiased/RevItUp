import useUserStore from "@/store/UserStore";
import ChildProp from "@/types/page/ChildProp";

function CheckLoading({ children }: ChildProp) {
    const isLoading = useUserStore(state => state.isLoading)

    if (isLoading) {
        return (
            <>
                <span>Is loading</span>
            </>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CheckLoading