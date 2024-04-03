import { RouterProvider, createBrowserRouter } from "react-router-dom"
import TestHeader from "./test/components/header/TestHeader"
import TestUsersPage from "./test/pages/TestUsers"
import Boo from "./test/components/BlankStuff"
import TestUserDetailedPage from "./test/pages/TestUserDetailedPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient = new QueryClient()
  const browserRouter = createBrowserRouter([
    {
      element: <TestHeader />,
      children: [
        {
          path: '/',
          element: <Boo />
        },
        {
          path: '/users',
          element: <TestUsersPage />
        },
        {
          path: '/detailedUser/:username',
          element: <TestUserDetailedPage />
        }
      ]
    }
  ])
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={browserRouter} />
      </QueryClientProvider>
    </>
  )
}

export default App
