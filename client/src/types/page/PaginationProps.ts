import { SetURLSearchParams } from "react-router-dom"

type PaginationContextProps = {
    page: number
    take: string
    query?: string | null
    maxPage: number
    setSearchParams: SetURLSearchParams
}

export default PaginationContextProps