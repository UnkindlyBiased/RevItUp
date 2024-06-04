import { ValidationChain, body } from 'express-validator'

const threadValidation: ValidationChain[] = [
    body("threadTitle")
        .notEmpty()
        .isLength({ min: 10, max: 50 }),
    body('threadText')
        .notEmpty()
        .isLength({ max: 2_500 })
]

export default threadValidation