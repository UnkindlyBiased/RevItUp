import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { Skeleton } from "@/components/ui/skeleton"

import AuthorBox from "@/components/pages/posts/detailed/AuthorBox"
import CommentUpload from "@/components/generic/comments/CommentField"
import SpanSplitter from "@/components/pages/posts/detailed/SpanSplitter"
import MainTitle from "@/components/pages/posts/MainTitle"
import { useGetPostByLink, useGetSavedCheck, useRegisterView } from "@/hooks/useGetPosts"
import Loading from "@/components/generic/misc/Loading"
import FetchedComments from "@/components/generic/comments/FetchedComments"
import DateSpan from "@/components/generic/misc/DateSpan"
import CategoryWithLink from "@/components/generic/category/CategoryLink"
import { RemoveSavedButton, SaveButton } from "@/components/pages/posts/saved/SaveButtons"
import SuspendedImage from "@/components/generic/misc/SuspendedImage"
import ReadableStats from "@/components/generic/misc/ReadableStats"
import Error from "@/components/generic/boundaries/Error"
import RecentThreads from "@/components/generic/threads/RecentThreads"

function PostDetailedPage(): React.ReactNode {
    const { postLink } = useParams()

    const { data: post, isLoading, error } = useGetPostByLink(postLink || '')
    const { data: isSaved } = useGetSavedCheck(post?.id || '')
    const { mutateAsync: addView } = useRegisterView(post?.id || '')

    useEffect(() => {
        if (post) {
            addView()
        }
    }, [addView, post])

    const memoizedCommentUpload = useMemo(() => post && <CommentUpload readableId={post.id} />, [post])

    useDocumentTitle(`REVITUP: ${post ? post.postTitle : 'Loading'}`)

    if (isLoading) return <Loading />

    if (error || !post) return <Error />

    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-[75%]">
                <div className="flex items-center uppercase mb-2 space-x-4">
                    <CategoryWithLink category={post.category} isLinkable / >
                    <DateSpan date={post.creationDate} />
                    <ReadableStats views={post.views} />
                </div>
                <MainTitle className="mb-3 text-7xl w-[90%]">{post.postTitle}</MainTitle>
                <span className="text-2xl font-medium mb-5">{post.previewText}</span>
                <SuspendedImage 
                    className="w-[75%] rounded-lg mb-5 shadow-md" src={post.imageLink} 
                    loadingComp={<Skeleton className="w-[75%] h-96 rounded-lg" />} />
                <SpanSplitter className="flex flex-col space-y-4 text-lg w-[75%] mb-3" text={post.text} />
                <FetchedComments className="mb-5" readableId={post.id} readableType="post-comments" />
                {memoizedCommentUpload}
            </div>
            <div className="flex flex-col space-y-4 h-fit">
                <div className="flex size-fit items-center space-x-3 mt-10">
                    { !isSaved ? <SaveButton postId={post.id} /> : <RemoveSavedButton postId={post.id} /> }
                    <AuthorBox author={post.author} />
                </div>
                <RecentThreads />
            </div>
        </div>
    )
}

export default PostDetailedPage