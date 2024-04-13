import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'

import { FaUser } from 'react-icons/fa6'
import useUserStore from '@/store/UserStore'

function UserDropdown(): React.ReactElement {
    const isAuth = useUserStore(state => state.isAuth)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FaUser className='size-6' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-8">
                    { !isAuth && <DropdownMenuItem>
                        <Link to={'/login'}>
                            <span>Login</span>
                        </Link>
                    </DropdownMenuItem> }
                    { isAuth && <DropdownMenuItem>
                        <span>Logout</span>
                    </DropdownMenuItem> }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserDropdown