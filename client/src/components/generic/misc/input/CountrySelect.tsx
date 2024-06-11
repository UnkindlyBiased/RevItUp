import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

import { useGetCountries } from "@/hooks/useGetCountries";
import Country from "@/types/data/country/Country";

function CountryItem({ country }: { country: Country }): React.ReactElement {
    return (
        <div className="flex space-x-2">
            <img className="w-6" src={country.flagImgLink} />
            <span children={country.name} />
        </div>
    )
}

function CountrySelect({ onValueChange, defaultValue, ...props }: SelectProps): React.ReactElement {
    const { data: countries } = useGetCountries()

    if (!countries) return <p>No countries are available</p>

    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue} {...props}>
            <SelectTrigger>
                <SelectValue placeholder='Choose a country' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {countries.map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                            <CountryItem country={c} />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CountrySelect