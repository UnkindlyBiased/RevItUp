import { useDocumentTitle } from '@uidotdev/usehooks'
import { useMemo } from 'react'

import RandomPost from '../components/pages/main-page/RandomPost'
import { useGetPosts } from '@/hooks/useGetPosts'
import PostPreviewComp from '@/components/pages/posts/preview/PostPreview'
import PostTopPreview from '@/components/pages/main-page/PostTopPreview'
import MoreButton from '@/components/pages/main-page/MoreButton'
import Error from '@/components/generic/boundaries/Error'
import splitRequests from '@/utils/HelperFuncs'

function MainPage(): React.ReactElement {
    useDocumentTitle("REVITUP: Motorsport, one place")

    const memoizedRandomPost = useMemo(() => <RandomPost />, [])
    const { data: topPosts, error } = useGetPosts(splitRequests([
        { key: 'page', value: '1' },
        { key: 'take', value: '5'}
    ], '&'))
    
    if (error) return <Error />

    return (
        <div className='flex flex-col space-y-4 h-max'>
            <div className='flex flex-col space-y-4'>
                { topPosts?.posts.map((post, i) => (
                    i === 0 ? <PostTopPreview key={i} post={post} /> : <PostPreviewComp key={i} post={post} />
                ))}
            </div>
            <div className='flex justify-center'>
                <MoreButton />
            </div>
            <div className='flex justify-center'>
                {memoizedRandomPost}
            </div>
        </div>
    )
}

export default MainPage