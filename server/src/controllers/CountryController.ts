import { Request, Response, NextFunction } from 'express' 
import CountryService from '../services/CountryService'
import { ApiError } from '../../utils/errors/ApiError'
import PgCountryRepository from '../repositories/implemented/postgre/PgCountryRepository'

class CountryController {
    private readonly service: CountryService

    constructor() {
        this.service = new CountryService(new PgCountryRepository())
    }

    getCountries = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const countries = await this.service.getCountries()
            res.send(countries)
        } catch(e) {
            next(e)
        }
    }
    getCountryByCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.params
            if (!code) {
                throw ApiError.MissingParameters("Country code was not given")
            }

            const country = this.service.getCountryByCode(code)
            res.send(country)
        } catch(e) {
            next(e)
        }
    }
}

export default new CountryController()