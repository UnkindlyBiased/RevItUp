import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Container from "./components/container/Container"
import MainPage from "./pages/MainPage"
import ColorModeProvider from "./providers/ColorModeProvider"

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
            <ColorModeProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={browserRouter} />
                </QueryClientProvider>
            </ColorModeProvider>
        </>
    )
}

export default App
