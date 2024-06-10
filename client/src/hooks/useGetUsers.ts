import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"

import UserService from "@/services/UserService"
import UserCreate from "@/types/data/users/UserCreate"
import useUserStore from "@/store/UserStore"
import UserChangePfp from "@/types/data/users/UserChangePfp"

const useGetUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getUsers()
})

const useGetUserById = (id: number | undefined) => useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id!),
    enabled: !!id
})

const useGetUserByLink = (link: string) => useQuery({
    queryKey: ['user-link', link],
    queryFn: () => UserService.getUserByLink(link)
})

const useCreateUser = (input: UserCreate) => useMutation({
    mutationFn: () => UserService.create(input),
    onSuccess: () => {
        toast({ title: 'Hooray!', description: 'Now you can login in the app!' })
    }
})

const useChangePfp = (input: UserChangePfp) => {
    const queryClient = useQueryClient()
    const user = useUserStore(state => state.user)

    return useMutation({
        mutationFn: () => UserService.changeProfilePicture(input),
        onSuccess: () => {
            toast({
                title: 'Hooray!',
                description: 'Your image was successfully uploaded'
            })
            queryClient.invalidateQueries({ queryKey: ['user-link', user?.userLink] })
        }
    })
}

export { 
    useGetUsers, 
    useGetUserById,
    useGetUserByLink,
    useChangePfp,
    useCreateUser
}