import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import { useGetSchema } from "@/hooks/useColorMode";

function MoreButton(): React.ReactElement {
    const schema = useGetSchema()

    return (
        <Link to='/news' className={cn("flex w-[65%] hover:w-[80%] py-2 items-center justify-center rounded-md cursor-pointer border-2 transition-all", schema.border)}>
            <span className="font-bold">More posts...</span>
        </Link>
    )
}

export default MoreButton