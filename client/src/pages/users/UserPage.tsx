import ContentBox from "@/hoc/ContentBox"
import UserDetailed from "@/types/data/users/UserDetailed"
import UserBiography from "@/components/pages/users/UserBiography"
import UserInfoHeading from "@/components/pages/users/UserInfoHeading"
import { cn } from "@/lib/utils"
import { useGetSchema } from "@/hooks/useColorMode"
import { Edit2 } from "lucide-react"
import useUserStore from "@/store/UserStore"

// TODO: fix it or not, IDK
function UserPage({ user }: { user: UserDetailed }): React.ReactElement {
    const loggedUser = useUserStore(state => state.user)
    const schema = useGetSchema()

    return (
        <ContentBox>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <UserInfoHeading 
                        username={user.username} 
                        isVerified={user.isVerified} 
                        registrationDate={user.registrationDate} />
                    { user.id === loggedUser?.id && <button className={cn(schema.primaryBgColor, 'text-white h-fit px-3 py-2 rounded-lg flex space-x-2 items-center')}>
                        <Edit2 size={20} />
                        <span className="font-medium">Edit data</span>
                    </button> }
                </div>
                <UserBiography text={null}/>
            </div>
        </ContentBox>
    )
}

export default UserPage