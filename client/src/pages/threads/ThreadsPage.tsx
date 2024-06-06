import { useDocumentTitle } from "@uidotdev/usehooks"

import Loading from "@/components/generic/misc/Loading"
import TwoLine from "@/components/generic/misc/TwoLine"
import ThreadComp from "@/components/pages/threads/ThreadComp"
import { useGetThreads } from "@/hooks/useThreads"
import OrFiller from "@/components/pages/threads/OrFiller"
import { useGetThreadCategories } from "@/hooks/useThreadCategories"
import ThreadCategoryLink from "@/components/pages/threads/categories/ThreadCategoryLink"

function ThreadsPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Threads')

    const { data: threads } = useGetThreads()
    const { data: threadCategories } = useGetThreadCategories()

    return (
        <div className="flex flex-col h-full space-y-4">
            <TwoLine title="Threads" description="Where you can talk on anything (after reading rules)" />
            <div className="flex flex-col space-y-7">
                <span className="text-center text-7xl font-bold">Choose a category below...</span>
                { threadCategories ? <div className="grid grid-cols-3 gap-3">
                    {threadCategories.map((cat, i) => (
                        <ThreadCategoryLink key={i} category={cat} />
                    ))}
                </div> : <Loading /> }
            </div>
            <OrFiller />
            <div className="flex flex-col space-y-2">
                { threads ? threads.threads.map(((thread, i) => (
                    <ThreadComp thread={thread} key={i} />
                ))) : <Loading /> }
            </div>
        </div>
    )
}

export default ThreadsPage