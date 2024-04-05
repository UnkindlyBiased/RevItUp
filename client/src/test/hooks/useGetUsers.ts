import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/UserService";

function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const users = await UserService.getUsers()
            return users
        },
        enabled: false // Data is being fetched by the click
    })
}

export default useGetUsers