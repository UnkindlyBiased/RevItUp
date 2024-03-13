import { RouterProvider, createBrowserRouter } from "react-router-dom"
import TestHeader from "./test/components/header/TestHeader"
import TestUsersPage from "./test/routes/TestUsers"
import Boo from "./test/components/BlankStuff"

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
