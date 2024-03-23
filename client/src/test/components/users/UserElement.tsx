import { UserShort } from "../../../types/users/UserShort"
import CountryDisplay from "../country/CountryDisplay"
import { H2 } from "../default/TestHeaderTags"

type PropsType = {
    user: UserShort,
    onClick?: () => void
}

function UserShortComp({ user, onClick }: PropsType) {
    return (
        <>
            <div className="flex flex-col" onClick={onClick}>
                <H2 className="cursor-pointer">{user.username}</H2>
                <span className="italic">ID: {user.id}</span>
                <CountryDisplay country={user.country} />
            </div>
        </>
    )
}

export default UserShortComp