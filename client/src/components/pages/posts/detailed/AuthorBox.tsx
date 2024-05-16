import { Link } from "react-router-dom"

import UserShort from "@/types/data/users/UserShort"

function AuthorBox({ author }: { author: UserShort }) {
    return (
        <div className="flex size-fit items-center text-white p-5 bg-light-theme-header rounded-lg">
            <span>Author: </span>
            <Link to={'/'} className="font-bold hover:underline ml-1">{author.username}</Link>
            <img className="w-[2vw] ml-2 shadow-lg" src={author.country.flagImgLink} />
        </div>
    )
}

export default AuthorBox