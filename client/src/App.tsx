import { lazy, Suspense, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Container from "./components/container/Container"
import ColorModeProvider from "./providers/ColorModeProvider"
import useUserStore from "./store/UserStore"
import ErrorPage from "./pages/ErrorPage"

const MainPage = lazy(() => import("./pages/MainPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const PostsPage = lazy(() => import("./pages/posts/PostsPage"))
const PostDetailedPage = lazy(() => import("./pages/posts/PostOpenedPage"))
const LoggedUserPage = lazy(() => import("./pages/users/defined/LoggedUserPage"))
const UserSavedPostsPage = lazy(() => import("./pages/users/UserSavedPosts"))

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
                element: <Suspense children={<MainPage />} />,
            },
            {
                path: "/login",
                element: <Suspense children={<LoginPage />} />
            },
            {
                path: '/news',
                element: <Suspense children={<PostsPage />} />
            },
            {
                path: '/news/:articleLink',
                element: <Suspense children={<PostDetailedPage />} />
            },
            {
                path: '/me',
                element: <Suspense children={<LoggedUserPage />} />
            },
            {
                path: '/me/saved-posts',
                element: <Suspense children={<UserSavedPostsPage />} />
            }
        ]
    }])

    return (
        <ColorModeProvider>
            <QueryClientProvider client={appQueryClient}>
                <RouterProvider router={browserRouter} />
            </QueryClientProvider>
        </ColorModeProvider>
    )
}

export { App, appQueryClient }