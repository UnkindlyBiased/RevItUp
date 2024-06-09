import { Request, Response, NextFunction } from 'express'

import CountryService from '../services/CountryService'
import PgCountryRepository from '../repositories/implemented/postgre/PgCountryRepository'
import { RequestWithParams } from '../../utils/types/DifferentiatedRequests'

class CountryController {
    private readonly service: CountryService

    constructor() {
        this.service = new CountryService(new PgCountryRepository())
    }

    getCountries = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const countries = await this.service.getCountries()
            return res.send(countries)
        } catch(e) {
            next(e)
        }
    }
    getCountryByCode = async (req: RequestWithParams<{ code: string }>, res: Response, next: NextFunction) => {
        try {
            const country = await this.service.getCountryByCode(req.params.code)
            return res.send(country)
        } catch(e) {
            next(e)
        }
    }
}

export default new CountryController()