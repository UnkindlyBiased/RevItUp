import { Switch } from "@/components/ui/switch"
import { useState } from "react"

import { useColorModeStore } from "@/store/ColorModeStore"
import { useTheme } from "@/hooks/useTheme"

function ThemeSwitch(): React.ReactElement {
    const [checked, setChecked] = useState(localStorage.getItem('vite-ui-theme') === 'dark')
    const setTheme = useColorModeStore((state) => state.setColorMode)

    const { setTheme: setTestTheme } = useTheme()

    const changeTheme = () => {
        const colorMode = checked ? 'light' : 'dark'
        setChecked(!checked)

        colorMode === 'dark' ? setTestTheme('dark') : setTestTheme('light')

        setTheme(colorMode)

        localStorage.setItem('vite-ui-theme', colorMode)
    }

    return (
        <div className="flex items-center space-x-4">
            <span className="hidden md:block md:font-bold md:text-lg" children={'Dark theme'} />
            <Switch 
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={checked} 
                onCheckedChange={changeTheme} />
        </div>
    )
}

export default ThemeSwitch