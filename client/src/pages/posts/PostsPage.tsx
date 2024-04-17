import ContentBox from "@/hoc/ContentBox"
import { useGetPosts } from "@/hooks/useGetPosts"
import { NavLink } from "react-router-dom"

function PostsPage(): React.ReactNode {
    const { data, isLoading } = useGetPosts()

    return (
        <>
            <ContentBox>
                {data?.map((post) => (
                    <NavLink key={post.id} to={`/news/${post.id}`}>
                        {post.postTitle}
                    </NavLink>
                ))}
            </ContentBox>
        </>
    )
}

export default PostsPage