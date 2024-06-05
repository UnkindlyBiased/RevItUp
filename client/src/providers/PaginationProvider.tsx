import { createContext } from "react"

import PaginationContextProps from "@/types/page/PaginationProps"

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined)

function PaginationProvider({ value, children }: { value: PaginationContextProps | undefined, children?: React.ReactElement }): React.ReactElement {
    return <PaginationContext.Provider value={value} children={children} />
}

export { PaginationContext, PaginationProvider }