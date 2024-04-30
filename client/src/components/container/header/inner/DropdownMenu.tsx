import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'

import useUserStore from '@/store/UserStore'

function UserDropdown(): React.ReactElement {
    const isAuth = useUserStore(state => state.isAuth)
    const logout = useUserStore(state => state.logout)

    const navigate = useNavigate()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FaUser className='size-6' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8">
                { !isAuth && <>
                    <DropdownMenuItem className='cursor-pointer'>
                        Register
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/login')}>
                        Login
                    </DropdownMenuItem>
                </> }
                { isAuth && <>
                    <DropdownMenuItem onClick={() => navigate('/me')}>
                        Your profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/me/saved-posts')}>
                        Saved posts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        Logout
                    </DropdownMenuItem>
                </> }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown