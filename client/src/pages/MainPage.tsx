import { useDocumentTitle } from '@uidotdev/usehooks'
import RandomPost from '../components/random-post/RandomPost'
import { useColorMode } from '@/hooks/useColorMode'
import useGetUsers from '@/hooks/useGetUsers'

function MainPage(): React.ReactElement {
    const containerStyle = useColorMode() === 'light' ? 'bg-white text-light-theme-text' : 'bg-black text-white'
    const { data } = useGetUsers()
    
    useDocumentTitle("REVITUP: The motorsport in one place")

    return (
        <>
            <div className={`${containerStyle} transition-all h-max`}>
                <div className='px-8 py-4 flex flex-col'>
                    <span>Main page</span>
                    { data && data.map(user => (
                        <span key={user.id}>{user.username}</span>
                    ))}
                </div>
                <RandomPost />
            </div>
        </>
    )
}

export default MainPage