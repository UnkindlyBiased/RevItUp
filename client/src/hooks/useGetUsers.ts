import UserService from "@/services/UserService"
import { useQuery } from "@tanstack/react-query"

function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const users = await UserService.getUsers()
            return users
        }
    })
}

export default useGetUsers