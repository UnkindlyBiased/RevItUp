import { useDocumentTitle } from "@uidotdev/usehooks"

import MainTitle from "@/components/pages/posts/MainTitle"
import SavedPost from "@/components/pages/posts/saved/SavedPost"
import RequireAuth from "@/hoc/RequireAuth"
import { useGetSavedPosts } from "@/hooks/useGetPosts"

function UserSavedPostsPage() {
    useDocumentTitle('REVITUP: Saved posts')
    
    const { data: savedPosts } = useGetSavedPosts()

    return (
        <RequireAuth>
            <div className="flex flex-col space-y-3">
                <MainTitle className="text-6xl">Your saved posts</MainTitle>
                <span className="text-lg">Amount: {savedPosts?.length || 0}</span>
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