import { useColorModeStore } from "@/store/ColorModeStore"
import ChildProp from "@/types/page/ChildProp"
import ColorMode from "@/types/page/style/ColorMode"
import { useEffect } from "react"

function ColorModeProvider({ children }: ChildProp): React.ReactElement {
    const setMode = useColorModeStore(state => state.setColorMode)

    useEffect(() => {
        const storedValue = localStorage.getItem('colorMode')
        
        if (storedValue) {
            setMode(storedValue as ColorMode)
        } else {
            localStorage.setItem("colorMode", "light")
        }
    }, [setMode])

    return (
        <>
            {children}
        </>
    )
}

export default ColorModeProvider