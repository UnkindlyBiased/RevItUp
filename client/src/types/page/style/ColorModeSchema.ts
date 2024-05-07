type ColorModeSchema = {
    primaryBgColor: string,
    secondaryBgColor: string,
    defaultFontColor: string,
    inputFontColor: string,
    border: string,

    // * This isn't so important, but needed for better design
    randomPostBgGradient: string,
}

const LightModeSchema: ColorModeSchema = {
    primaryBgColor: 'bg-light-theme-header',
    defaultFontColor: 'text-light-theme-text',
    inputFontColor: 'text-white',
    secondaryBgColor: 'bg-white',
    border: "border-black border-opacity-50",
    randomPostBgGradient: 'from-teal-400 to-yellow-200'
}

const DarkModeSchema: ColorModeSchema = {
    primaryBgColor: 'bg-dark-theme-header',
    defaultFontColor: 'text-white',
    inputFontColor: 'text-black',
    secondaryBgColor: 'bg-black',
    border: "border-white border-opacity-50",
    randomPostBgGradient: 'from-slate-900 to-slate-700'
}

export { type ColorModeSchema, LightModeSchema, DarkModeSchema }