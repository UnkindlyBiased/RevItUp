import { useColorModeStore } from "@/store/ColorModeStore";
import { DarkModeSchema, LightModeSchema } from "@/types/page/style/ColorModeSchema";

function useColorMode() {
    const colorMode = useColorModeStore((state) => state.color)
    return colorMode
}

function useSetColorMode() {
    const colorMode = useColorMode() === 'light' ? "dark" : "light"
    const setColorMode = useColorModeStore((state) => state.setColorMode)

    setColorMode(colorMode)
    localStorage.setItem("colorMode", colorMode)
}

function useGetSchema() {
    const currentColorSchema = useColorModeStore(state => state.color) === 'light' ? LightModeSchema : DarkModeSchema
    return currentColorSchema
}

export { useColorMode, useSetColorMode, useGetSchema }