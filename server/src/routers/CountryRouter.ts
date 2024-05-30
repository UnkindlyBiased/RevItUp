import { Router } from 'express'
import CountryController from '../controllers/CountryController'
import { cacheMiddleware } from '../../utils/middlewares/cache/CacheMiddleware'

const CountryRouter = Router()

CountryRouter.get('/', cacheMiddleware('countries'), CountryController.getCountries)
CountryRouter.get('/:code', CountryController.getCountryByCode)

export default CountryRouter