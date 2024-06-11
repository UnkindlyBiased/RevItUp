import { useParams } from "react-router-dom"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { useEffect } from "react"

import { useGetThreadByLink, useRegisterView } from "@/hooks/useThreads"
import Error from "@/components/generic/boundaries/Error"
import Loading from "@/components/generic/misc/Loading"
import MainTitle from "@/components/pages/posts/MainTitle"
import DateSpan from "@/components/generic/misc/DateSpan"
import ReadableStats from "@/components/generic/misc/ReadableStats"
import ThreadCategoryLink from "@/components/pages/threads/detailed/ThreadCategoryLink"
import ThreadDetailedContent from "@/components/pages/threads/detailed/ThreadDetailedContent"
import ThreadCommentUpload from "@/components/generic/threads/ThreadCommentUpload"
import ThreadFetchedComments from "@/components/generic/threads/ThreadFetchedComments"

function ThreadDetailedPage(): React.ReactNode {
    const { link } = useParams()

    const { data: thread, error, isLoading } = useGetThreadByLink(link || '')
    const { mutateAsync: registerView } = useRegisterView(thread?.id || '')

    useEffect(() => {
        if (thread) {
            registerView()
        }
    }, [thread, registerView])

    useDocumentTitle(thread && `REVITUP: Thread: ${thread.threadTitle}` || '')

    if (!thread || isLoading) return <Loading />
    if (error) return <Error />

    return (
        <div className="flex w-[75%]">
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-3 items-center">
                    <ThreadCategoryLink {...thread.threadCategory} />
                    <DateSpan date={thread.creationDate} />
                    <ReadableStats views={thread.views} />
                </div>
                <MainTitle className="text-6xl" children={thread.threadTitle} />
                <ThreadDetailedContent content={thread.threadText} />
                <div className="mt-10 space-y-4">
                    <ThreadFetchedComments threadId={thread.id} />
                    <ThreadCommentUpload threadId={thread.id} />
                </div>
            </div>
        </div>
    )
}

export default ThreadDetailedPage