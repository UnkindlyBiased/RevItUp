import MainTitle from "@/components/pages/posts/MainTitle"
import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import ContentBox from "@/hoc/ContentBox"
import RequireAuth from "@/hoc/RequireAuth"
import { useGetSavedPosts } from "@/hooks/useGetPosts"
import { useDocumentTitle } from "@uidotdev/usehooks"

function UserSavedPosts() {
    useDocumentTitle('REVITUP: Saved posts')
    const { data: savedPosts } = useGetSavedPosts()

    return (
        <RequireAuth>
            <ContentBox>
                <div className="flex flex-col space-y-3">
                    <MainTitle className="text-6xl">Your saved posts</MainTitle>
                    <span className="text-lg">Amount: {savedPosts?.length}</span>
                    {savedPosts ? 
                        <div className="flex flex-col space-y-2">
                            {savedPosts.map(post => (
                                <PostPreviewComp key={post.id} post={post} />
                            ))}
                        </div> : 
                        <span>No posts saved</span>
                    }
                </div>
            </ContentBox>
        </RequireAuth>
    )
}

export default UserSavedPosts