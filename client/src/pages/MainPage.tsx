import { useDocumentTitle } from '@uidotdev/usehooks'
import { Suspense, useMemo } from 'react'

import RandomPost from '../components/pages/main-page/RandomPost'
import useUserStore from '@/store/UserStore'

function MainPage(): React.ReactElement {
    const user = useUserStore(state => state.user)
    const memoizedRandomPost = useMemo(() => <RandomPost />, [])
    
    useDocumentTitle("REVITUP: Motorsport, one place")

    return (
        <div className={`h-max`}>
            <div className='px-8 py-4 flex flex-col'>
                <span className="text-3xl">Main page</span>
                {user && <span>Logged</span>}
            </div>
            <Suspense>
                {memoizedRandomPost}
            </Suspense>
        </div>
    )
}

export default MainPage