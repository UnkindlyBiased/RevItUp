import { useEffect, useRef } from "react"
import Typed from 'typed.js'

function Error() {
    const errorTitleRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const typed = new Typed(errorTitleRef.current, {
            strings: ["There was some sort of error"],
            typeSpeed: 50,
            showCursor: false
        })

        return () => { typed.destroy() }
    }, [])
    
    return (
        <div className="px-8 py-7 flex flex-col justify-center items-center space-y-2">
            <span className="text-5xl font-bold" ref={errorTitleRef} />
            <span className="text-xl">We don't know to fix it at this moment, please stay with us</span>
        </div>
    )
}

export default Error