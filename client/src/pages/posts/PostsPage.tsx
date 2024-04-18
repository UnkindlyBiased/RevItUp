import ContentBox from "@/hoc/ContentBox"
import { useGetPosts } from "@/hooks/useGetPosts"
import { Link } from "react-router-dom"

function PostsPage(): React.ReactNode {
    const { data } = useGetPosts()

    return (
        <>
            <ContentBox>
                {data?.map((post) => (
                    <Link key={post.id} to={`/news/${post.postLink}`}>
                        {post.postTitle}
                    </Link>
                ))}
            </ContentBox>
        </>
    )
}

export default PostsPage