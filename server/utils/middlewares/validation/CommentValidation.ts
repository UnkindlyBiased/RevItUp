import { body, ValidationChain } from "express-validator"

const commentValidation: ValidationChain[] = [
    body('text').notEmpty().escape()
]

export { commentValidation }