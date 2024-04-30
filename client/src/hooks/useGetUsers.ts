import { useQuery } from "@tanstack/react-query"

import UserService from "@/services/UserService"

const useGetUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getUsers()
})

const useGetUserById = (id: number | undefined) => useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id!),
    enabled: !!id
})

export { useGetUsers, useGetUserById }