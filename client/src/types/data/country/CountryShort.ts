import Country from "./Country";

type CountryShort = Omit<Country, "id" | "countryCode">

export default CountryShort