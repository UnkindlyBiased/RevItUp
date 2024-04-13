type ColorModeSchema = {
    headerColor: string,
    defaultFontColor: string,
    inputFontColor: string,
    bgColor: string,

    // * This isn't so important, but needed for better design
    randomPostBgGradient: string,
}

const LightModeSchema: ColorModeSchema = {
    headerColor: 'bg-light-theme-header',
    defaultFontColor: 'text-light-theme-text',
    inputFontColor: 'text-white',
    bgColor: 'bg-white',
    randomPostBgGradient: 'from-teal-400 to-yellow-200'
}

const DarkModeSchema: ColorModeSchema = {
    headerColor: 'bg-dark-theme-header',
    defaultFontColor: 'text-white',
    inputFontColor: 'text-black',
    bgColor: 'bg-black',
    randomPostBgGradient: 'from-slate-900 to-slate-700'
}

export { type ColorModeSchema, LightModeSchema, DarkModeSchema }