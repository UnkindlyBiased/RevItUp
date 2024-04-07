import { useColorModeStore } from "@/store/ColorModeStore";

function useColorMode() {
    const colorMode = useColorModeStore((state) => state.color)
    return colorMode
}

function useSetColorMode() {
    const colorMode = useColorMode() === 'light' ? "dark" : "light"
    const setColorMode = useColorModeStore((state) => state.setColorMode)

    setColorMode(colorMode)
    localStorage.setItem("colorMode", colorMode)
    console.log(localStorage.getItem("colorMode"))
}

export { useColorMode, useSetColorMode }