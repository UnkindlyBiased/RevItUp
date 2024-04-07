import ColorMode from "@/types/page/ColorMode"
import { create } from "zustand"

type ColorModeState = {
    color: ColorMode,
    isDark: boolean,
    setColorMode: (color: ColorMode) => void,
    setIsDark: (value: boolean) => void
}

const useColorModeStore = create<ColorModeState>((set) => ({
    color: "light",
    isDark: false,
    setColorMode: (color: ColorMode) => set({ color }),
    setIsDark: (value: boolean) => set({ isDark: value }),
}))

export { useColorModeStore }