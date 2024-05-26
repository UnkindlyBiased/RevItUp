import { ComponentPropsWithoutRef } from "react"

type DateSpanProps = {
    date: Date
}

function DateSpan({ date, ...props }: DateSpanProps & ComponentPropsWithoutRef<'span'>) {
    return (
        <span {...props}>{new Date(date)
            .toLocaleString().split(':').slice(0, 2).join(':')}</span>
    )
}

export default DateSpan