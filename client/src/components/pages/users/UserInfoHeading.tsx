import { Verified } from "lucide-react"

import DateSpan from "@/components/generic/misc/DateSpan"
import UserRoles from "@/types/data/users/UserRoles"
import RevitupLogo from "@/components/generic/misc/RevitupLogo"

type UserInfoHeadingProps = {
    username: string
    isVerified: boolean
    registrationDate: Date
    role: UserRoles
}

function UserInfoHeading({ username, isVerified, registrationDate, role }: UserInfoHeadingProps) {
    return (
        <div className="flex items-center space-x-4 w-fit">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3 h-fit">
                    <span className="text-4xl font-bold" children={username} />
                    { isVerified && <Verified size={24} className="mt-1" /> }
                    { role === 'admin' && <RevitupLogo className="size-9 mt-1 stroke-[25px]" title="Administrator" /> }
                </div>
                <span>Registration date: <DateSpan date={registrationDate} /></span>
            </div>
        </div>
    )
}

export default UserInfoHeading