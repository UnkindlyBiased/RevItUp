import { Link } from "react-router-dom"


function Logo(): React.ReactElement {
    return (
        <>
            <Link to={'/'}>
                <img src="/REVITUP_logo.png" className="w-52 cursor-pointer hover:w-56 transition-all" />
            </Link>
        </>
    )
}

export default Logo