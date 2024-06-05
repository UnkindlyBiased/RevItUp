import { useDocumentTitle } from "@uidotdev/usehooks"

import Loading from "@/components/generic/misc/Loading"
import TwoLine from "@/components/generic/misc/TwoLine"
import ThreadComp from "@/components/pages/threads/ThreadComp"
import { useGetThreads } from "@/hooks/useThreads"
import OrFiller from "@/components/pages/threads/OrFiller"

function ThreadsPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Threads')

    const { data } = useGetThreads()

    return (
        <div className="flex flex-col h-full space-y-4">
            <TwoLine title="Threads" description="Where you can talk on anything (after reading rules)" />
            <OrFiller />
            <div className="flex flex-col space-y-2">
                { data ? data.threads.map(((thread, i) => (
                    <ThreadComp thread={thread} key={i} />
                ))) : <Loading /> }
            </div>
        </div>
    )
}

export default ThreadsPage