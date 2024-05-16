import { useToast } from "@/components/ui/use-toast"
import { useGetSchema } from "./useColorMode";

const useThemedToast = () => {
    const { toast: baseToast } = useToast()
    const schema = useGetSchema()

    const toast = (title?: string, description?: string) => {
        return baseToast({
            title, 
            description,
            className: 'bg-red-200'
        })
    }

    return { toast };
};

export default useThemedToast