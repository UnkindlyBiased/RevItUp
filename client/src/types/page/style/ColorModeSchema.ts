type ColorModeSchema = {
    primaryBgColor: string,
    secondaryBgColor: string,
    defaultFontColor: string,
    inputFontColor: string,
    border: string,
    randomLogo: string
}

const LightModeSchema: ColorModeSchema = {
    primaryBgColor: 'bg-light-theme-header',
    defaultFontColor: 'text-light-theme-text',
    inputFontColor: 'text-white',
    secondaryBgColor: 'bg-white',
    border: "border-black border-opacity-50",
    randomLogo: 'stroke-gray-700'
}

const DarkModeSchema: ColorModeSchema = {
    primaryBgColor: 'bg-dark-theme-header',
    defaultFontColor: 'text-white',
    inputFontColor: 'text-black',
    secondaryBgColor: 'bg-black',
    border: "border-white border-opacity-50",
    randomLogo: 'stroke-gray-300'
}

export { type ColorModeSchema, LightModeSchema, DarkModeSchema }