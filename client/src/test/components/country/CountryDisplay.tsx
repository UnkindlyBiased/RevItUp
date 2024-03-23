import Country from "../../../types/country/Country"

type PropsType = {
    country: Country
}

function CountryDisplay({ country }: PropsType) {
    return (
        <>
            <div className="flex space-x-2 items-center">
                <img className=" size-10" src={country.flagImgLink} alt={country.countryCode} />
                <span>{country.name}</span>
            </div>
        </>
    )
}

export default CountryDisplay