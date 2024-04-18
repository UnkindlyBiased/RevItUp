import UserShort from "@/types/data/users/UserShort"
import { Link } from "react-router-dom"

type AuthorBoxProps = {
    author: UserShort
}

function AuthorBox({ author }: AuthorBoxProps) {
    return (
        <div className="size-fit text-white p-5 bg-light-theme-header rounded-lg">
            <span>Author: <Link to={'/'} className="underline">
                {author.username}
            </Link></span>
        </div>
    )
}

export default AuthorBox