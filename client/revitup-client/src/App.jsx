import { useEffect, useState } from "react"
import Header from "./components/ui/header/Header"
import axios from 'axios'
import { ArticleRow } from "./components/ui/articles/ArticlesComponents"

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8008/posts/').then(res => {
      setPosts(res.data)
    })
  }, [])
  return <>
    <Header/>
    {posts.map(post => <ArticleRow key={post.id} post={post} />)}
  </>
}

export default App