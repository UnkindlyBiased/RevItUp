import { useDocumentTitle } from "@uidotdev/usehooks"
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

import Loading from "@/components/generic/misc/Loading"
import TwoLine from "@/components/generic/misc/TwoLine"
import ThreadComp from "@/components/pages/threads/ThreadComp"
import { useGetThreads } from "@/hooks/useThreads"
import OrFiller from "@/components/pages/threads/OrFiller"
import splitRequests from "@/utils/HelperFuncs"
import PaginationContextProps from "@/types/page/PaginationProps"
import { PaginationProvider } from "@/providers/PaginationProvider"
import PaginationRow from "@/components/generic/misc/pagination/PaginationRow"
import { AddThread } from "@/components/pages/threads/authored/ThreadDefaultActions"
import useUserStore from "@/store/UserStore"
import AppRoutes from "@/utils/enums/AppRoutes"


function ThreadsPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Threads')

    const isAuth = useUserStore(state => state.isAuth)
    const [searchParams, setSearchParams] = useSearchParams({
        page: '1', take: '10'
    })

    const { data: pagedData } = useGetThreads(splitRequests([
        { key: 'page', value: searchParams.get('page') || '1' },
        { key: 'take', value: searchParams.get('take') || '10' }
    ], '&'))

    useEffect(() => {
        const currentPage = searchParams.get('page')

        if (pagedData && Number(currentPage) > pagedData.maxPage) {
            setSearchParams({ 
                page: '1', 
                take: searchParams.get('take') || '10'
            })
        }
    }, [searchParams, setSearchParams, pagedData])

    const providerValue: PaginationContextProps = {
        page: pagedData?.page || 1,
        take: searchParams.get('take') || '10',
        maxPage: pagedData?.maxPage || 1,
        setSearchParams
    }

    return (
        <div className="flex flex-col h-full space-y-5">
            <div className="flex justify-between items-center">
                <TwoLine title="Threads" description="Where you can talk on anything (after reading rules)" />
                { isAuth ? <AddThread /> : <Link to={AppRoutes.LOGIN} className="font-medium hover:underline" children='Log in to add thread' />}
            </div>
            <OrFiller />
            <PaginationProvider value={providerValue}>
                <div className="flex flex-col space-y-4 items-center">
                    <div className="flex flex-col space-y-2 w-full">
                        { pagedData ? pagedData.threads.map(((thread, i) => (
                            <ThreadComp thread={thread} key={i} />
                        ))) : <Loading /> }
                    </div>
                    <PaginationRow />
                </div>
            </PaginationProvider>
        </div>
    )
}

export default ThreadsPage