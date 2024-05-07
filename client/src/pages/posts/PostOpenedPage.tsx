import { Suspense, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDocumentTitle } from "@uidotdev/usehooks"

import AuthorBox from "@/components/pages/posts/detailed/AuthorBox"
import CommentUpload from "@/components/generic/comments/CommentField"
import SpanSplitter from "@/components/pages/posts/detailed/SpanSplitter"
import MainTitle from "@/components/pages/posts/MainTitle"
import { useGetPostByLink, useGetSavedCheck } from "@/hooks/useGetPosts"
import Loading from "@/components/generic/Loading"
import FetchedComments from "@/components/generic/comments/FetchedComments"
import DateSpan from "@/components/generic/DateSpan"
import CategoryWithLink from "@/components/generic/category/CategoryLink"
import { RemoveSavedButton, SaveButton } from "@/components/pages/posts/saved/SaveButtons"

function PostDetailedPage(): React.ReactNode {
    const { articleLink } = useParams()
    const { data: post, isLoading } = useGetPostByLink(articleLink || '')
    const { data: isSaved } = useGetSavedCheck('9ac3d4f2-773d-4056-9bbb-b6ff83c816ae')

    const memoizedCommentUpload = useMemo(() => post && <CommentUpload readableId={post.id} />, [post])

    useEffect(() => {
        console.log(isSaved)
    }, [isSaved])

    useDocumentTitle(`REVITUP: ${post ? post.postTitle : 'Loading'}`)

    if (isLoading || !post) {
        return <Loading />
    }

    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-[75%]">
                <div className="flex items-center uppercase mb-2 space-x-4">
                    <CategoryWithLink category={post.category} / >
                    <DateSpan date={post.creationDate} />
                </div>
                <MainTitle className="mb-3 text-7xl">{post.postTitle}</MainTitle>
                <span className="text-2xl font-medium mb-5">{post.previewText}</span>
                <Suspense fallback={<span>{post.postTitle}</span>}>
                    <img className="w-[65%] rounded-lg mb-5 shadow-md" src={post.imageLink} />
                </Suspense>
                <div className="flex flex-col space-y-4 text-lg w-[75%] mb-3">
                    <SpanSplitter text={post.text} />
                </div>
                <div className="mb-5">
                    <FetchedComments readableId={post.id} readableType="post-comments" />
                </div>
                {memoizedCommentUpload}
            </div>
            <div className="flex h-fit items-center space-x-3 mt-10">
                { !isSaved ? <SaveButton postId={post.id} /> : <RemoveSavedButton postId={post.id} /> }
                <AuthorBox author={post.author} />
            </div>
        </div>
    )
}

export default PostDetailedPage