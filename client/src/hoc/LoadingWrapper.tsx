import ChildProp from "@/types/page/ChildProp"

type LoadingWrapperProps = ChildProp & {
    isLoading: boolean
    isError?: boolean
}

function LoadingWrapper({ isLoading, children }: LoadingWrapperProps): React.ReactNode {
    if (isLoading) {
        return (
            <span>Is loading</span>
        )
    }

    return children
}

export default LoadingWrapper