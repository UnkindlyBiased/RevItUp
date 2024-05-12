import { useToast } from "@/components/ui/use-toast"

const useThemedToast = () => {
    const { toast: baseToast } = useToast();

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