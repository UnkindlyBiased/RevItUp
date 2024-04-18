import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'

import { FaUser } from 'react-icons/fa6'
import useUserStore from '@/store/UserStore'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'

function UserDropdown(): React.ReactElement {
    const isAuth = useUserStore(state => state.isAuth)
    const logout = useUserStore(state => state.logout)

    const navigate = useNavigate()
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FaUser className='size-6' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-8">
                    { !isAuth && <>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/login')}>
                            <span>Login</span>
                        </DropdownMenuItem>
                    </> }
                    { isAuth && <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </> }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserDropdown