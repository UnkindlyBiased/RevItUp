import { useContext } from "react"

import { PaginationContext } from "@/providers/PaginationProvider"

const usePaginationContext = () => {
    const paginationValue = useContext(PaginationContext)

    if (paginationValue === undefined) {
        throw new Error("usePaginationContext must be defined and passed")
    }

    return paginationValue
}

export default usePaginationContext