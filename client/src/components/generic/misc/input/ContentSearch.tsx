import { cn } from "@/lib/utils"

import { useGetSchema } from "@/hooks/useColorMode"
import CustomInput from "./CustomInput"
import { useState } from "react"

type ContentSearchProps = {
    title?: string,
    onSearch: (value: string) => void
}

function ContentSearch({ title, onSearch }: ContentSearchProps): React.ReactElement {
    const schema = useGetSchema()
    const [query, setQuery] = useState<string>('')

    const handleSearch = () => {
        onSearch(query)
        setQuery('')
    }

    return (
        <div className={cn("flex flex-col text-white p-6 rounded-lg space-y-3 size-fit", schema.primaryBgColor)}>
            <span className="text-xl" children={title} />
            <CustomInput placeholder="Write something here..." value={query} onChange={e => setQuery(e.target.value)} />
            <button 
                disabled={query.trim().length === 0} 
                className="size-fit px-4 py-2 text-black bg-white rounded-md disabled:opacity-50 transition" 
                children='Search'
                onClick={handleSearch} />
        </div>
    )
}

export default ContentSearch