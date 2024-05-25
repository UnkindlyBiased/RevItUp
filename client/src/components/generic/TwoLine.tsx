import { cn } from "@/lib/utils";

import MainTitle from "../pages/posts/MainTitle";

type TwoLineProps = Partial<{
    title: string
    description: string
    enlargedDesc: boolean
}>

function TwoLine({ title, description, enlargedDesc }: TwoLineProps): React.ReactElement {
    return (
        <div className="flex flex-col space-y-2">
            <MainTitle className="text-6xl" children={title} />
            <span className={cn(enlargedDesc && 'text-xl')} children={description} />
        </div>
    )
}

export default TwoLine