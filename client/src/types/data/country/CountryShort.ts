import Country from "./Country";

type CountryShort = Pick<Country, "name" | "flagImgLink">

export default CountryShort