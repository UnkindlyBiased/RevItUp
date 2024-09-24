import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Container from "./components/container/Container"
import ErrorPage from "./pages/ErrorPage"
import AuthProvider from "./providers/AuthProvider"
import { ThemeProvider } from "./providers/ThemeProvider"
import AppRoutes from "./utils/enums/AppRoutes"
import { toast } from "./components/ui/use-toast"

const MainPage = lazy(() => import("./pages/MainPage"))
const AdminPage = lazy(() => import("./pages/admin/AdminPanel"))
const LoginPage = lazy(() => import("./pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"))

const PostsPage = lazy(() => import("./pages/posts/PostsPage"))
const PostDetailedPage = lazy(() => import("./pages/posts/PostDetailedPage"))
const PostSearchPage = lazy(() => import("./pages/posts/PostSearchPage"))

const CategoriesPage = lazy(() => import("./pages/categories/CategoriesPage"))
const CategoryDetailedPage = lazy(() => import("./pages/categories/CategoryDetailedPage"))

const ThreadsPage = lazy(() => import("./pages/threads/ThreadsPage"))
const ThreadDetailedPage = lazy(() => import("./pages/threads/ThreadDetailedPage"))

const UserPage = lazy(() => import("./pages/users/UserPage"))
const UserSavedPostsPage = lazy(() => import("./pages/users/UserSavedPosts"))
const UserWrittenPostsPage = lazy(() => import("./pages/posts/UserWrittenPostsPage"))

/**
 * The main app component
 */
function App(): React.ReactElement {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
            mutations: {
                onError: () => toast(
                    { 
                        title: 'Uh-oh...', 
                        description: 'Some sort of error happened', 
                        variant: 'destructive'
                    }
                )
            }
        }
    })

    const browserRouter = createBrowserRouter([{
        element: <Container />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: AppRoutes.DEFAULT,
                element: <Suspense children={<MainPage />} />,
            },
            {
                path: AppRoutes.ADMIN,
                element: <Suspense children={<AdminPage />} />
            },
            {
                path: AppRoutes.LOGIN,
                element: <Suspense children={<LoginPage />} />
            },
            {
                path: AppRoutes.REGISTER,
                element: <Suspense children={<RegisterPage />} />
            },
            {
                path: AppRoutes.POSTS,
                element: <Suspense children={<PostsPage />} />
            },
            {
                path: AppRoutes.POSTS_SEARCH,
                element: <Suspense children={<PostSearchPage />} />
            },
            {
                path: AppRoutes.OPENED_POST,
                element: <Suspense children={<PostDetailedPage />} />
            },
            {
                path: AppRoutes.CATEGORIES,
                element: <Suspense children={<CategoriesPage />} />
            },
            {
                path: AppRoutes.OPENED_CATEGORY,
                element: <Suspense children={<CategoryDetailedPage />} />
            },
            {
                path: AppRoutes.THREADS,
                element: <Suspense children={<ThreadsPage />} />
            },
            {
                path: AppRoutes.OPENED_THREAD,
                element: <Suspense children={<ThreadDetailedPage />} />
            },
            {
                path: AppRoutes.USER_PAGE,
                element: <Suspense children={<UserPage />} />
            },
            {
                path: AppRoutes.YOUR_SAVED_POSTS,
                element: <Suspense children={<UserSavedPostsPage />} />
            },
            {
                path: AppRoutes.YOUR_WRITTEN_POSTS,
                element: <Suspense children={<UserWrittenPostsPage />} />
            }
        ]
    }])

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={browserRouter} />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App