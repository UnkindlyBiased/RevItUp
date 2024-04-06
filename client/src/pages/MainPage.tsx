import { useDocumentTitle } from '@uidotdev/usehooks'
import RandomPost from '../components/random-post/RandomPost'

function MainPage(): React.ReactElement {
    useDocumentTitle("REVITUP: The motorsport in one place")

    return (
        <>
            <span>Main page</span>
            <RandomPost />
        </>
    )
}

export default MainPage