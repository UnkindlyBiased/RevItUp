import CountryService from "@/services/CountryService";
import { useQuery } from "@tanstack/react-query";

const useGetCountries = () => useQuery({
    queryKey: ['countries'],
    queryFn: () => CountryService.getCountries()
})

export { useGetCountries }