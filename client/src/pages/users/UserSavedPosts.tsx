import MainTitle from "@/components/pages/posts/MainTitle"
import SavedPost from "@/components/pages/posts/saved/SavedPost"
import RequireAuth from "@/hoc/RequireAuth"
import { useGetSavedPosts } from "@/hooks/useGetPosts"
import { useDocumentTitle } from "@uidotdev/usehooks"

function UserSavedPostsPage() {
    useDocumentTitle('REVITUP: Saved posts')
    const { data: savedPosts } = useGetSavedPosts()

    return (
        <RequireAuth>
            <div className="flex flex-col space-y-3">
                <MainTitle className="text-6xl">Your saved posts</MainTitle>
                <span className="text-lg">Amount: {savedPosts?.length}</span>
                {savedPosts?.length ? 
                    <div className="flex flex-col space-y-2">
                        {savedPosts.map((post, i) => (
                            <SavedPost key={i} post={post} />
                        ))}
                    </div> : 
                    <span>No posts saved</span>
                }
            </div>
        </RequireAuth>
    )
}

export default UserSavedPostsPage