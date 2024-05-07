import { Switch } from "@/components/ui/switch"
import { useState } from "react"

import { useColorModeStore } from "@/store/ColorModeStore"

function ThemeSwitch(): React.ReactElement {
    const [checked, setChecked] = useState(localStorage.getItem("colorMode") === 'dark')
    const setTheme = useColorModeStore((state) => state.setColorMode)

    const changeTheme = () => {
        const colorMode = checked ? 'light' : 'dark'
        setChecked(!checked)
        setTheme(colorMode)

        localStorage.setItem("colorMode", colorMode)
    }

    return (
        <div className="flex items-center space-x-4">
            <span className="font-bold text-lg" children={'Dark theme'} />
            <Switch 
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={checked} 
                onCheckedChange={changeTheme} />
        </div>
    )
}

export default ThemeSwitch