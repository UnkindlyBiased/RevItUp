import { ComponentPropsWithRef, forwardRef } from "react"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"

const CustomInput = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(
    ({ className, type, placeholder, ...props }, ref) => {
        return <Input className={cn(
"w-60 font-medium text-black",className
        )} placeholder={placeholder} ref={ref} type={type} {...props} />
    }
)

export default CustomInput