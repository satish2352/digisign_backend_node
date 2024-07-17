const { body, validationResult } = require('express-validator');
const apiResponse=require('../helper/apiResponse');
const User=require('../model/user');

// Validation rules for user creation
const createSignatureValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    body('roleId').notEmpty().withMessage('Role ID is required')
  ];
};


module.exports = {
    createSignatureValidationRules
};
