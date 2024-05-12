import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'

import useUserStore from '@/store/UserStore'

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
                    <DropdownMenuItem className='cursor-pointer'>
                        Register
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/login')}>
                        Login
                    </DropdownMenuItem>
                </> }
                { user && <>
                    <DropdownMenuItem onClick={() => navigate('/me')}>
                        Your profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/me/saved-posts')}>
                        Saved posts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    { user.role === "writer" || user.role === "admin" && (
                        <>
                            <DropdownMenuItem onClick={() => navigate('/me/written-articles')}>
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