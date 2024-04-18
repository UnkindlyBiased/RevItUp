import Logo from "@/components/generic/Logo"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ErrorPage(): React.ReactElement {
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = setTimeout(() => { navigate('/') }, 3000)

        return () => clearTimeout(timeout)
    }, [navigate])

    useDocumentTitle("REVITUP: 404")

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center space-y-8 text-black">
                <Logo isDark className='w-[38rem]' />
                <div className='flex flex-col items-center space-y-3'>
                    <span className="text-5xl font-bold">404 Not Found</span>
                    <span className="text-3xl font-bold">Redirecting to main page in 3 seconds</span>
                </div>
            </div>
        </>
    )
}

export default ErrorPage