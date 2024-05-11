import { useDocumentTitle } from "@uidotdev/usehooks"
import { useState } from "react"

import { AddNewPost } from "@/components/pages/posts/authored/AuthoredActions"
import AuthoredPostNavLink from "@/components/pages/posts/authored/AuthoredPostNavLink"
import MainTitle from "@/components/pages/posts/MainTitle"
import RequireAuth from "@/hoc/RequireAuth"
import { useGetPostById, useGetPostsByAuthorship } from "@/hooks/useGetPosts"
import useUserStore from "@/store/UserStore"

/**
 * Page which shows the posts with logined user's authorship (if they have `WRITER` role).
 * Also they can edit, delete or add new post here
 */
function UserWrittenPostsPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Your posts')

    const user = useUserStore(state => state.user)

    const { data: posts } = useGetPostsByAuthorship(user?.id || 0)
    const [ postId, setPostId ] = useState<string | null>(null)
    const { data: chosenPost } = useGetPostById(postId)

    return (
        <RequireAuth>
            <div className="flex flex-col h-fit space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-2">
                        <MainTitle className="text-6xl">Your articles</MainTitle>
                        <span>Add them, edit them, delete them</span>
                    </div>
                    <AddNewPost />
                </div>
                <div className="flex justify-between space-x-16">
                    <div className="flex flex-col space-y-4 w-fit">
                        {posts?.map((post, i) => (
                            <AuthoredPostNavLink key={i} post={post} onClick={() => setPostId(post.id)} />
                        ))}
                    </div>
                    {chosenPost && <div className="flex flex-col space-y-2 flex-1">
                        <MainTitle className="text-4xl">{chosenPost.postTitle}</MainTitle>
                        <span className="text-lg">{chosenPost.previewText}</span>
                        <img className="rounded-lg w-[55%]" src={chosenPost.imageLink} />
                    </div>}
                </div>
            </div>
        </RequireAuth>
    )
}

export default UserWrittenPostsPage