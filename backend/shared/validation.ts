import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUser: ValidationChain[] = [
  body('first_name').isString().withMessage('First name must be a string'),
  body('last_name').isString().withMessage('Last name must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('is_admin').isBoolean().withMessage('is_admin must be a boolean')
];

export const loginInfoValidation: ValidationChain[] = [
    body('email').isString().withMessage('email must be string and required!'),
    body('password').isString().withMessage('password must be string and required!')
]

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length == 0)
        return res.status(404).json('Invalid Inputs!!');

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
};
