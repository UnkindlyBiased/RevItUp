import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

function MainTitle({ className, children }: ComponentPropsWithoutRef<'span'>) {
    return (
        <span className={cn('font-oswald', className)}>
            {children}
        </span>
    )
}

export default MainTitle