import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { MainPostsPage } from "./pages/posts/MainPostsPage"

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <MainPostsPage />
  }])
  return (
    <RouterProvider router={router} />
  )  
}

export default App
