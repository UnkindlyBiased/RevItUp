import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Container from "./components/container/Container"
import MainPage from "./pages/MainPage"

function App() {
    const queryClient = new QueryClient()
    const browserRouter = createBrowserRouter([{
        element: <Container />,
        children: [
            {
                path: '/',
                element: <MainPage />
            }
        ]
    }])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={browserRouter} />
            </QueryClientProvider>
        </>
    )
}

export default App
