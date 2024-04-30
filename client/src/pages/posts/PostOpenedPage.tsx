import { Suspense, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDocumentTitle } from "@uidotdev/usehooks"

import CommentComp from "@/components/generic/comments/CommentComp"
import AuthorBox from "@/components/pages/posts/detailed/AuthorBox"
import CommentUpload from "@/components/generic/comments/CommentField"
import SpanSplitter from "@/components/pages/posts/detailed/SpanSplitter"
import MainTitle from "@/components/pages/posts/MainTitle"
import ContentBox from "@/hoc/ContentBox"
import { useGetCommentsForPost } from "@/hooks/useComments"
import { useGetPostByLink } from "@/hooks/useGetPosts"
import Loading from "@/components/generic/Loading"

function PostDetailedPage(): React.ReactNode {
    const { articleLink } = useParams()
    const { data: post, isLoading } = useGetPostByLink(articleLink || '')
    const { data: comments } = useGetCommentsForPost(post?.id || '1234-5678')
    
    const memoizedCommentUpload = useMemo(() => post && <CommentUpload readableId={post.id} />, [post])

    useDocumentTitle(`REVITUP: ${post ? post.postTitle : 'Loading'}`)

    if (isLoading || !post) {
        return <Loading />
    }
    
    return (
        <ContentBox>
            <div className="flex justify-between">
                <div className="flex flex-col w-[75%]">
                    <div className="flex items-center uppercase mb-2 space-x-4">
                        <span className="font-bold cursor-pointer hover:underline">Formula 1</span>
                        <span>
                            {new Date(post.creationDate).toUTCString()}
                        </span>
                    </div>
                    <MainTitle className="mb-3 text-7xl">
                        {post.postTitle}
                    </MainTitle>
                    <span className="text-2xl font-medium mb-5">
                        {post.previewText}</span>
                    <Suspense fallback={<span>{post.postTitle}</span>}>
                        <img className="w-[65%] rounded-lg mb-5 shadow-md" src={post.imageLink} />
                    </Suspense>
                    <div className="flex flex-col space-y-4 text-lg w-[75%] mb-3">
                        <SpanSplitter text={post.text} />
                    </div>
                    <div className="flex flex-col mb-5">
                        <div className="flex items-center space-x-2 font-bold text-4xl">
                            <span>Comments</span>
                            <span className="text-xs">●</span>
                            <span>{comments?.length || 0}</span>
                        </div>
                        {comments && (
                            <div>
                                {comments.map((comment) => (
                                    <CommentComp className="mt-4" key={comment.id} comment={comment} />
                                ))}
                            </div>
                        )}
                    </div>
                    {memoizedCommentUpload}
                </div>
                <AuthorBox author={post.author} />
            </div>
        </ContentBox>
    )
}

export default PostDetailedPage