import { useDocumentTitle } from '@uidotdev/usehooks'
import { useMemo } from 'react'

import RandomPost from '../components/pages/main-page/RandomPost'
import { useGetPosts } from '@/hooks/useGetPosts'
import PostPreviewComp from '@/components/pages/posts/preview/PostPreview'
import PostTopPreview from '@/components/pages/main-page/PostTopPreview'
import MoreButton from '@/components/pages/main-page/MoreButton'

function MainPage(): React.ReactElement {
    const memoizedRandomPost = useMemo(() => <RandomPost />, [])
    const { data: topPosts } = useGetPosts('take=5')
    
    useDocumentTitle("REVITUP: Motorsport, one place")

    return (
        <div className='flex flex-col space-y-4 h-max'>
            <div className='flex flex-col space-y-4'>
                {topPosts?.posts.map((post, i) => (
                    i === 0 ? <PostTopPreview key={i} post={post} /> : <PostPreviewComp key={i} post={post} />
                ))}
            </div>
            <div className='flex justify-center'>
                <MoreButton />
            </div>
            {memoizedRandomPost}
        </div>
    )
}

export default MainPage