import { Request, Response, NextFunction } from 'express' 
import CountryService from '../services/CountryService'
import { ApiError } from '../../utils/errors/ApiError'

class CountryController {
    async getCountries(_req: Request, res: Response, next: NextFunction) {
        try {
            const countries = await CountryService.getCountries()
            res.send(countries)
        } catch(e) {
            next(e)
        }
    }
    async getCountryByCode(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.params
            if (!code) {
                throw ApiError.MissingParameters("Country code was not given")
            }

            const country = await CountryService.getCountryByCode(code)
            res.send(country)
        } catch(e) {
            next(e)
        }
    }
}

export default new CountryController()