const { body, validationResult } = require('express-validator');
const apiResponse=require('../helper/apiResponse');

// Validation rules for user creation
const createUserValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    body('roleId').notEmpty().withMessage('Role ID is required')
  ];
};

// Validation rules for user login
const loginUserValidationRules = () => {
  return [
    body('email').isEmail().trim().withMessage('Valid email is required'),
    body('password').notEmpty().isLength({
        min: 8,
        max: 100,
    }).trim().withMessage('Password is required min 8 digit')
  ];
};

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation failed', errors.array());
  }
  next();
};

module.exports = {
  createUserValidationRules,
  loginUserValidationRules,
  validate
};
