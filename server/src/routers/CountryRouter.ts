import { Router } from 'express'
import CountryController from '../controllers/CountryController'

const CountryRouter = Router()

CountryRouter.get('/', CountryController.getCountries)
CountryRouter.get('/:code', CountryController.getCountryByCode)

export default CountryRouter