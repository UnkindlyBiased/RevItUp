import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'

import useUserStore from '@/store/UserStore'
import AppRoutes from '@/utils/enums/AppRoutes'

/**
 * Dropdown menu for the header
 */
function UserDropdown(): React.ReactElement {
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout)

    const navigate = useNavigate()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FaUser className='size-6' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8">
                { !user && <>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(AppRoutes.REGISTER)}>
                        Register
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(AppRoutes.LOGIN)}>
                        Login
                    </DropdownMenuItem>
                </> }
                { user && <>
                    <DropdownMenuItem onClick={() => navigate(AppRoutes.USER_PAGE.replace(':link', user.userLink))}>
                        Your profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(AppRoutes.YOUR_SAVED_POSTS)}>
                        Saved posts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    { user.role === "writer" || user.role === "admin" && (
                        <>
                            <DropdownMenuItem onClick={() => navigate(AppRoutes.YOUR_WRITTEN_POSTS)}>
                                Your articles
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem onClick={logout}>
                        Logout
                    </DropdownMenuItem>
                </> }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown