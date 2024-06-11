import { cn } from "@/lib/utils"

type TakeButtonProps = Partial<{
    className: string,
    isChosen: boolean,
    children: React.ReactNode,
    onClick: () => void
}>

function TakeButton({ className, isChosen, children, onClick }: TakeButtonProps) {
    return (
        <button className={cn(className, isChosen && 'bg-light-theme-header text-white')} onClick={onClick} children={children} />
    )
}

export default TakeButton