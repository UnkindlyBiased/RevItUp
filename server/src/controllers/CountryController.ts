import { Request, Response } from 'express' 
import CountryService from '../services/CountryService'
import { ApiError } from '../../utils/errors/ApiError'

class CountryController {
    async getCountries(req: Request, res: Response) {
        try {
            const countries = await CountryService.getCountries()
            res.send(countries)
        } catch(e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async getCountryByCode(req: Request, res: Response) {
        try {
            const { code } = req.params
            if (!code) {
                throw ApiError.MissingParameters("Country code was not given")
            }

            const country = await CountryService.getCountryByCode(code)
            res.send(country)
        } catch(e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
}

export default new CountryController()