import { Link } from "react-router-dom"


function Logo(): React.ReactElement {
    return (
        <>
            <Link to={'/'} className="w-52 hover:w-56 transition-all">
                <img src="/REVITUP_logo.png" />
            </Link>
        </>
    )
}

export default Logo