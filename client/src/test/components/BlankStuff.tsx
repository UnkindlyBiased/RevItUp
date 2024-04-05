import { useDocumentTitle } from "@uidotdev/usehooks"
import { H1, H2, H3 } from "./default/TestHeaderTags"

function Boo() {
    useDocumentTitle("REVITUP: Motorstport For You")


    return (
        <>
            <div>
                <H1>Blank stuff</H1>
                <H2>Blank stuff</H2>
                <H3>Blank stuff</H3>
            </div>
        </>
    )
}

export default Boo