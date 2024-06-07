import ThreadService from "@/services/ThreadService";
import { useQuery } from "@tanstack/react-query";

const useGetThreads = (options?: string) => useQuery({
    queryKey: ['threads'],
    queryFn: () => ThreadService.getThreads(options)
})

export {
    useGetThreads
}