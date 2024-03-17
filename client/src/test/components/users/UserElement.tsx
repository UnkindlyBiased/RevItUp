import { UserShort } from "../../../types/users/UserShort"
import { H2 } from "../default/TestHeaderTags"

type PropsType = {
    user: UserShort,
    onClick?: () => void
}

function UserShortComp({ user, onClick }: PropsType) {
    return (
        <>
            <div className="flex flex-col" onClick={onClick}>
                <H2>{user.username}</H2>
                <span className="italic">ID: {user.id}</span>
            </div>
        </>
    )
}

export default UserShortComp