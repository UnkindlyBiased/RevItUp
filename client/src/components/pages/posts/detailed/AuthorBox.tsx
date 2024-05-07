import { Link } from "react-router-dom"

import UserShort from "@/types/data/users/UserShort"

type AuthorBoxProps = {
    author: UserShort
}

function AuthorBox({ author }: AuthorBoxProps) {
    return (
        <div className="flex items-center size-fit text-white p-5 bg-light-theme-header rounded-lg">
            <span>Author: </span>
            <Link to={'/'} className="font-bold hover:underline ml-1">{author.username}</Link>
            <img className="w-7 ml-2" src={author.country.flagImgLink} />
        </div>
    )
}

export default AuthorBox