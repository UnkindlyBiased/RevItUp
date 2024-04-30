import { Suspense } from "react"
import { Link } from "react-router-dom"

import UserShort from "@/types/data/users/UserShort"

type AuthorBoxProps = {
    author: UserShort
}

function AuthorBox({ author }: AuthorBoxProps) {
    return (
        <div className="flex items-center space-x-1 size-fit text-white p-5 bg-light-theme-header rounded-lg">
            <span>Author: </span>
            <Link to={'/'} className="font-bold hover:underline">{author.username}</Link>
            <Suspense fallback={<span>{author.country.name}</span>}>
                <img className="w-7 rounded-sm" src={author.country.flagImgLink} />
            </Suspense>
        </div>
    )
}

export default AuthorBox