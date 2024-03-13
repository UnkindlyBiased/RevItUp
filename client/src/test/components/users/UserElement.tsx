import { UserShort } from "../../../types/UserShort"

type PropsType = {
    user: UserShort
}

function UserShortComp({ user }: PropsType) {
    return (
        <>
            <h2>{user.username}</h2>
            <span>ID: {user.id}</span>
        </>
    )
}

export default UserShortComp