import { useDocumentTitle } from '@uidotdev/usehooks'
import RandomPost from '../components/pages/main-page/RandomPost'
import useGetUsers from '@/hooks/useGetUsers'
import useUserStore from '@/store/UserStore'
import { Suspense } from 'react'

function MainPage(): React.ReactElement {
    const { data } = useGetUsers()
    const user = useUserStore(state => state.user)
    
    useDocumentTitle("REVITUP: Motorsport, one place")

    return (
        <>
            <div className={`h-max`}>
                <div className='px-8 py-4 flex flex-col'>
                    <span className="text-3xl">Main page</span>
                    {user && <span>Logged</span>}
                    { data?.map(user => (
                        <span key={user.id}>{user.username}</span>
                    ))}
                </div>
                <Suspense>
                    <RandomPost />
                </Suspense>
            </div>
        </>
    )
}

export default MainPage