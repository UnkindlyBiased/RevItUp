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
import UserSavedPosts from "./pages/users/UserSavedPosts"
import LoggedUserPage from "./pages/users/defined/LoggedUserPage"

const appQueryClient = new QueryClient()

function App() {
    const checkAuth = useUserStore(state => state.checkAuth)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [checkAuth])

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
                path: '/news/:articleLink',
                element: <PostDetailedPage />
            },
            {
                path: '/me',
                element: <LoggedUserPage />
            },
            {
                path: '/me/saved-posts',
                element: <UserSavedPosts />
            }
        ]
    }])

    return (
        <>
            <ColorModeProvider>
                <QueryClientProvider client={appQueryClient}>
                    <RouterProvider router={browserRouter} />
                </QueryClientProvider>
            </ColorModeProvider>
        </>
    )
}

export { App, appQueryClient }