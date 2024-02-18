import { useEffect, useState } from 'react'
import './App.css'
import PostsService from './services/PostsService'
import { IPostPreviewDto } from './types/ProductsTypes'
import { WidePost } from './components/posts/Posts'

function App() {
  const [posts, setPosts] = useState<IPostPreviewDto[]>([])
  useEffect(() => {
    async function getPosts() {
      try {
        setPosts(await PostsService.getPosts())
      } catch (e) {
        console.log(e)
      }
    }
    getPosts()
  }, [])
  return (
    <>
      {posts.map(post => (
        <WidePost key={post.id} props={post} />
      ))}
    </>
  )
}

export default App
