import { useDocumentTitle } from '@uidotdev/usehooks'
import { Suspense, useMemo } from 'react'

import RandomPost from '../components/pages/main-page/RandomPost'

function MainPage(): React.ReactElement {
    const memoizedRandomPost = useMemo(() => <RandomPost />, [])
    
    useDocumentTitle("REVITUP: Motorsport, one place")

    return (
        <div className='h-max'>
            <div className='flex flex-col'>
                <span className="text-3xl">Main page</span>
            </div>
            <Suspense>
                <div className='my-4'>
                    {memoizedRandomPost}
                </div>
            </Suspense>
        </div>
    )
}

export default MainPage