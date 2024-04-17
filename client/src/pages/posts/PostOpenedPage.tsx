import PostTitle from "@/components/pages/posts/PostTitle"
import ContentBox from "@/hoc/ContentBox"
import LoadingWrapper from "@/hoc/LoadingWrapper"
import { useGetPostById } from "@/hooks/useGetPosts"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { Suspense } from "react"
import { useParams } from "react-router-dom"

function PostDetailedPage(): React.ReactNode {
    const { articleId } = useParams()
    const { data, isLoading } = useGetPostById(Number(articleId))

    useDocumentTitle(`REVITUP: ${data ? data.postTitle : 'Loading'}`)
    
    if (data) {
        return (
            <>
                <LoadingWrapper isLoading={isLoading}>
                    <ContentBox>
                        <div className="flex flex-col">
                            <span className="font-bold cursor-pointer hover:underline uppercase mb-2">
                                Formula 1
                            </span>
                            <div className="w-[55%] mb-2">
                                <PostTitle>
                                    {data.postTitle}
                                </PostTitle>
                            </div>
                            <span className="text-2xl font-medium mb-5">
                                {data.previewText}
                            </span>
                            <Suspense>
                                <img className="w-[45%] rounded-lg mb-5" src={data?.imageLink} />
                            </Suspense>
                            <div className="w-[65%] text-lg">
                                <span>
                                    {data.text}
                                </span>
                            </div>
                        </div>
                    </ContentBox>
                </LoadingWrapper>
            </>
        )
    }
}

export default PostDetailedPage