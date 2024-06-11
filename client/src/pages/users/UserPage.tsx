import { useParams } from "react-router-dom"

import UserBiography from "@/components/pages/users/UserBiography"
import UserInfoHeading from "@/components/pages/users/UserInfoHeading"
import useUserStore from "@/store/UserStore"
import RequireAuth from "@/hoc/RequireAuth"
import { useGetUserByLink } from "@/hooks/useGetUsers"
import Error from "@/components/generic/boundaries/Error"
import Loading from "@/components/generic/misc/Loading"
import UserPfp from "@/components/pages/users/UserPfp"
import { useDocumentTitle } from "@uidotdev/usehooks"
import UserEdit from "@/components/pages/users/UserEdit"

function UserPage(): React.ReactElement {
    const { link } = useParams()
    const { data: user, isLoading } = useGetUserByLink(link || '')
    
    const loggedUser = useUserStore(state => state.user)

    useDocumentTitle('REVITUP: User: ' + user?.username)

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
                    { user.id === loggedUser?.id && <UserEdit countryId={user.country.id} /> }
                </div>
                <UserBiography text={user.biography}/>
            </div>
        </RequireAuth>
    )
}

export default UserPage