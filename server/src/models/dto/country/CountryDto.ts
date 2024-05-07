import CountryModel from "../../domain/Country";

type CountryDto = Pick<CountryModel, "name" | "flagImgLink">

export default CountryDto