import { useEffect, useState } from 'react'
import PostsService from '../../services/PostsService'
import { IPostPreviewDto } from '../../types/PostsTypes'
import { WidePost } from '../../components/posts/Posts'

export function MainPostsPage() {
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