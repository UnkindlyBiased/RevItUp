import ThreadService from "@/services/ThreadService";
import { useQuery } from "@tanstack/react-query";

const useGetThreads = () => useQuery({
    queryKey: ['threads'],
    queryFn: () => ThreadService.getThreads()
})

export {
    useGetThreads
}