import { create } from "zustand"

import ColorMode from "@/types/page/style/ColorMode"

/** Type with properties and methods for defining and changing color modes */
type ColorModeState = {
    color: ColorMode,
    setColorMode: (color: ColorMode) => void
}

const useColorModeStore = create<ColorModeState>((set) => ({
    color: "light",
    setColorMode: (color: ColorMode) => set({ color })
}))

export { useColorModeStore }