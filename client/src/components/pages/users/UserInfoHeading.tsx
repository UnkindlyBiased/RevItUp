import { Verified } from "lucide-react"
import UserPfp from "./UserPfp"
import DateSpan from "@/components/generic/misc/DateSpan"

type UserInfoHeadingProps = {
    username: string
    isVerified: boolean
    registrationDate: Date
}

function UserInfoHeading({ username, isVerified, registrationDate }: UserInfoHeadingProps) {
    return (
        <div className="flex items-center space-x-4 w-fit">
            <UserPfp className="rounded-md object-cover size-24 hover:size-32 transition-all" src="/indian man.jpg" />
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    <span className="text-4xl font-bold">{username}</span>
                    { isVerified && <Verified /> }
                </div>
                <span>Registration date: <DateSpan date={registrationDate} /></span>
            </div>
        </div>
    )
}

export default UserInfoHeading