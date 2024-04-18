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
    
    if (data) {
        return (
            <LoadingWrapper isLoading={isLoading}>
                <ContentBox>
                    <div className="flex justify-between">
                        <div className="flex flex-col w-[80%]">
                            <div className="flex uppercase mb-2 space-x-3">
                                <span className="font-bold cursor-pointer hover:underline">Formula 1</span>
                                <span>
                                    {new Date(data.creationDate).toUTCString()}
                                </span>
                            </div>
                            <PostTitle className="mb-3">
                                {data.postTitle}
                            </PostTitle>
                            <span className="text-2xl font-medium mb-5">
                                {data.previewText}
                            </span>
                            <Suspense>
                                <img className="w-[55%] rounded-lg mb-5 shadow-md" src={data.imageLink} />
                            </Suspense>
                            <div className="flex flex-col space-y-4 text-lg w-[75%]">
                                <SpanSplitter text={data.text} />
                            </div>
                        </div>
                        <AuthorBox author={data.author} />
                    </div>
                </ContentBox>
            </LoadingWrapper>
        )
    }
}

export default PostDetailedPage