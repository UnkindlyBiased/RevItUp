import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Container from "./components/container/Container"
import ColorModeProvider from "./providers/ColorModeProvider"
import ErrorPage from "./pages/ErrorPage"
import AuthProvider from "./providers/AuthProvider"

const MainPage = lazy(() => import("./pages/MainPage"))
const AdminPage = lazy(() => import("./pages/admin/AdminPanel"))
const LoginPage = lazy(() => import("./pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"))

const PostsPage = lazy(() => import("./pages/posts/PostsPage"))
const PostDetailedPage = lazy(() => import("./pages/posts/PostDetailedPage"))
const PostSearchPage = lazy(() => import("./pages/posts/PostSearchPage"))

const CategoriesPage = lazy(() => import("./pages/categories/CategoriesPage"))
const CategoryDetailedPage = lazy(() => import("./pages/categories/CategoryDetailedPage"))

const LoggedUserPage = lazy(() => import("./pages/users/defined/LoggedUserPage"))
const UserSavedPostsPage = lazy(() => import("./pages/users/UserSavedPosts"))
const UserWrittenPostsPage = lazy(() => import("./pages/posts/UserWrittenPostsPage"))

/**
 * The main app component
 */
function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            
        }
    })

    const browserRouter = createBrowserRouter([{
        element: <Container />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Suspense children={<MainPage />} />,
            },
            {
                path: '/admin',
                element: <Suspense children={<AdminPage />} />
            },
            {
                path: "/login",
                element: <Suspense children={<LoginPage />} />
            },
            {
                path: '/register',
                element: <Suspense children={<RegisterPage />} />
            },
            {
                path: '/news',
                element: <Suspense children={<PostsPage />} />
            },
            {
                path: '/news/search',
                element: <Suspense children={<PostSearchPage />} />
            },
            {
                path: '/news/:articleLink',
                element: <Suspense children={<PostDetailedPage />} />
            },
            {
                path: '/categories',
                element: <Suspense children={<CategoriesPage />} />
            },
            {
                path: '/categories/:code',
                element: <Suspense children={<CategoryDetailedPage />} />
            },
            {
                path: '/me',
                element: <Suspense children={<LoggedUserPage />} />
            },
            {
                path: '/me/saved-posts',
                element: <Suspense children={<UserSavedPostsPage />} />
            },
            {
                path: '/me/written-articles',
                element: <Suspense children={<UserWrittenPostsPage />} />
            }
        ]
    }])

    return (
        <ColorModeProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={browserRouter} />
                </QueryClientProvider>
            </AuthProvider>
        </ColorModeProvider>
    )
}

export default App