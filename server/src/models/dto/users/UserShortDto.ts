import CountryDto from "../country/CountryDto";

export default interface UserShortDto {
    id: number,
    username: string,
    country: CountryDto
}