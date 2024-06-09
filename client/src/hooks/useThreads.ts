import ThreadService from "@/services/ThreadService";
import useUserStore from "@/store/UserStore";
import ThreadInput from "@/types/data/threads/ThreadInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetThreads = (options?: string) => useQuery({
    queryKey: ['threads', options],
    queryFn: () => ThreadService.getThreads(options)
})

const useGetThreadByLink = (link: string) => useQuery({
    queryKey: ['thread-detailed', link],
    queryFn: () => ThreadService.getThreadByLink(link)
})

const useCreateThread = (input: ThreadInput) => {
    const queryClient = useQueryClient()
    const user = useUserStore((state) => state.user)

    input.authorId = user ? user.id : 0

    return useMutation({
        mutationFn: () => ThreadService.create(input),
        onSettled: () => {},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['threads'] })
        }
    })
}

const useRegisterView = (id: string) => useMutation({
    mutationFn: () => ThreadService.registerView(id)
})

export {
    useGetThreads,
    useGetThreadByLink,
    useCreateThread,
    useRegisterView
}