import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Container from "./components/container/Container"
import MainPage from "./pages/MainPage"
import ColorModeProvider from "./providers/ColorModeProvider"
import LoginPage from "./pages/LoginPage"
import useUserStore from "./store/UserStore"
import ErrorPage from "./pages/ErrorPage"
import PostDetailedPage from "./pages/posts/PostOpenedPage"
import PostsPage from "./pages/posts/PostsPage"

function App() {
    const checkAuth = useUserStore(state => state.checkAuth)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [checkAuth])

    const queryClient = new QueryClient()
    const browserRouter = createBrowserRouter([{
        element: <Container />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: '/news',
                element: <PostsPage />
            },
            {
                path: '/news/:articleId',
                element: <PostDetailedPage />
            }
        ]
    }])

    return (
        <>
            <ColorModeProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={browserRouter} />
                </QueryClientProvider>
            </ColorModeProvider>
        </>
    )
}

export default App
