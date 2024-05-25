import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils";

import { useGetSchema } from "./useColorMode";

const useThemedToast = () => {
    const { toast: baseToast } = useToast()
    const schema = useGetSchema()

    const toast = (title?: string, description?: string) => {
        return baseToast({
            title,
            description,
            className: cn(
                schema.secondaryBgColor, 
                schema.defaultFontColor, 
                schema.border
            )
        })
    }

    return { toast }
}

export default useThemedToast