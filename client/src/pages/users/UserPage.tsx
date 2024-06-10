import { cn } from "@/lib/utils"
import { Edit2 } from "lucide-react"
import { useParams } from "react-router-dom"

import UserBiography from "@/components/pages/users/UserBiography"
import UserInfoHeading from "@/components/pages/users/UserInfoHeading"
import { useGetSchema } from "@/hooks/useColorMode"
import useUserStore from "@/store/UserStore"
import RequireAuth from "@/hoc/RequireAuth"
import { useGetUserByLink } from "@/hooks/useGetUsers"
import Error from "@/components/generic/boundaries/Error"
import Loading from "@/components/generic/misc/Loading"
import UserPfp from "@/components/pages/users/UserPfp"

function UserPage(): React.ReactElement {
    const { link } = useParams()
    const { data: user, isLoading } = useGetUserByLink(link || '')
    
    const loggedUser = useUserStore(state => state.user)
    const schema = useGetSchema()

    if (isLoading) return <Loading />
    if (!user) return <Error />

    return (
        <RequireAuth>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        <UserPfp src={user.pfpLink} userId={user.id} />
                        <UserInfoHeading 
                            username={user.username} 
                            isVerified={user.isVerified} 
                            registrationDate={user.registrationDate}
                            role={user.role} />
                    </div>
                    { user.id === loggedUser?.id && <button className={cn(schema.primaryBgColor, 'text-white h-fit px-3 py-2 rounded-lg flex space-x-2 items-center')}>
                        <Edit2 size={20} />
                        <span className="font-medium">Edit data</span>
                    </button> }
                </div>
                <UserBiography text={null}/>
            </div>
        </RequireAuth>
    )
}

export default UserPage