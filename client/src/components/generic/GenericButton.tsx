import { useGetSchema } from "@/hooks/useColorMode";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

function GenericButton({ children, className, disabled, onClick, ...props }: ComponentPropsWithoutRef<'button'>) {
    const schema = useGetSchema()
    return (
        <button {...props}
            disabled={disabled} 
            className={cn("text-white size-fit rounded-md px-4 py-2 transition-all font-bold",  schema.primaryBgColor,className)} 
            onClick={onClick}
            children={children} />
    )
}

export default GenericButton