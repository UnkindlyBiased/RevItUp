import { useDocumentTitle } from '@uidotdev/usehooks'
import { Link } from 'react-router-dom'

function Forbidden(): React.ReactElement {
    useDocumentTitle('REVITUP: Forbidden')

    return (
        <div className='flex flex-col items-center space-y-3'>
            <span className='text-5xl font-bold'>Oh no! You can't have access to this page</span>
            <span className='text-xl'>The reason can be that you don't have enough rights</span>
            <img className='w-52 rounded-lg shadow-md' src='/pages/Forbidden_Alo.webp' />
            <Link to='/' className='opacity-35 hover:opacity-100 hover:underline transition-all'>To main page</Link>
        </div>
    )
}

export default Forbidden