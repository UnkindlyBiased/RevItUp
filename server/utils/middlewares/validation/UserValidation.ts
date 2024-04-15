import { body, ValidationChain } from 'express-validator'

const userValidation: ValidationChain[] = [
    body('username')
        .isLength({ min: 6, max: 30 })
        .withMessage("Username should be from 6 to 30 characters")
        .notEmpty(),
    body("password")
        .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("Password should be not less than 8 characters, contain at least 1 number and 1 symbol"),
    body("emailAddress")
        .isEmail()
        .notEmpty()
]

export { userValidation }