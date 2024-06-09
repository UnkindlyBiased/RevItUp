import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

import usePaginationContext from "@/hooks/usePaginationContext"

function PaginationRow() {
    const context = usePaginationContext()

    return (
        <Pagination className="size-fit">
            <PaginationContent>
                { context.page > 1 && <>
                    <PaginationItem onClick={() => context.setSearchParams([
                            ['page', (context.page - 1).toString()],
                            ['take', context.take.toString()],
                            context.query && ['query', context.query] || ['', '']
                        ])} >
                        <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink children={context.page - 1} / >
                    </PaginationItem>
                </> }
                <PaginationItem>
                    <PaginationLink children={context.page} />
                </PaginationItem>
                { context.page < context.maxPage && <>
                    <PaginationItem>
                        <PaginationLink children={context.page + 1} / >
                    </PaginationItem>
                    <PaginationItem onClick={() => context.setSearchParams([
                            ['page', (context.page + 1).toString()],
                            ['take', context.take.toString()],
                            context.query && ['query', context.query] || ['', '']
                        ])} >
                        <PaginationNext />
                    </PaginationItem>
                </> }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationRow