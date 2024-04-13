import CountryService from "@/services/CountryService";
import { useQuery } from "@tanstack/react-query";

function useGetCountries() {
    return useQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            const countries = await CountryService.getCountries()
            return countries
        }
    })
}

export default useGetCountries