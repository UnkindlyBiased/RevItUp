import { SetURLSearchParams } from "react-router-dom"

type PaginationContextProps = {
    page: number
    take: number
    maxPage: number
    setSearchParams: SetURLSearchParams
}

export default PaginationContextProps