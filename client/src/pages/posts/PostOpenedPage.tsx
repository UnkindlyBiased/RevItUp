import CommentComp from "@/components/generic/comments/Comment"
import AuthorBox from "@/components/pages/posts/detailed/AuthorBox"
import SpanSplitter from "@/components/pages/posts/detailed/SpanSplitter"
import PostTitle from "@/components/pages/posts/PostTitle"
import ContentBox from "@/hoc/ContentBox"
import LoadingWrapper from "@/hoc/LoadingWrapper"
import { useGetPostByLink } from "@/hooks/useGetPosts"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { Suspense } from "react"
import { useParams } from "react-router-dom"

function PostDetailedPage(): React.ReactNode {
    const { articleLink } = useParams()
    const { data, isLoading } = useGetPostByLink(articleLink!)

    useDocumentTitle(`REVITUP: ${data ? data.postTitle : 'Loading'}`)
    
    if (data) return (
        <LoadingWrapper isLoading={isLoading}>
            <ContentBox>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[75%]">
                        <div className="flex items-center uppercase mb-2 space-x-2">
                            <span className="font-bold cursor-pointer hover:underline">Formula 1</span>
                            <span className="opacity-30">●</span>
                            <span>
                                {new Date(data.creationDate).toUTCString()}
                            </span>
                        </div>
                        <PostTitle className="mb-3 text-7xl">
                            {data.postTitle}
                        </PostTitle>
                        <span className="text-2xl font-medium mb-5">
                            {data.previewText}
                        </span>
                        <Suspense fallback={<span>{data.postTitle}</span>}>
                            <img className="w-[65%] rounded-lg mb-5 shadow-md" src={data.imageLink} />
                        </Suspense>
                        <div className="flex flex-col space-y-4 text-lg w-[75%] mb-3">
                            <SpanSplitter text={data.text} />
                        </div>
                        <div className="flex flex-col space-y-5">
                            <div className="flex items-center space-x-2 font-bold text-4xl">
                                <span>Comments</span>
                                <span className="opacity-40 text-lg">●</span>
                                <span>{data.comments.length}</span>
                            </div>
                            <div>
                                {data.comments.map((comment) => (
                                    <CommentComp key={comment.id} comment={comment} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <AuthorBox author={data.author} />
                </div>
            </ContentBox>
        </LoadingWrapper>
    )
}

export default PostDetailedPage