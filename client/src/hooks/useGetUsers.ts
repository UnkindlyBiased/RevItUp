import { useQuery, useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"

import UserService from "@/services/UserService"
import UserCreate from "@/types/data/users/UserCreate"

const useGetUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getUsers()
})

const useGetUserById = (id: number | undefined) => useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id!),
    enabled: !!id
})

const useCreateUser = (input: UserCreate) => useMutation({
    mutationFn: () => UserService.create(input),
    onSuccess: () => {
        toast({ title: 'Hooray!', description: 'Now you can login in the app!' })
    }
})

export { 
    useGetUsers, 
    useGetUserById,
    useCreateUser
}