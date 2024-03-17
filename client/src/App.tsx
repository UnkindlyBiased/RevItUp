import { RouterProvider, createBrowserRouter } from "react-router-dom"
import TestHeader from "./test/components/header/TestHeader"
import TestUsersPage from "./test/routes/TestUsers"
import Boo from "./test/components/BlankStuff"
import TestUserDetailedPage from "./test/routes/TestUserDetailedPage"

function App() {
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
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
