const { body, validationResult } = require('express-validator');
const apiResponse=require('../helper/apiResponse');
const User=require('../model/user');

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

const updateUserValidationRules = () => {
  return [
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('mobile').optional().isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
    body('is_active').optional().isBoolean().withMessage('is_active must be a boolean value'),
    body('is_deleted').optional().isBoolean().withMessage('is_deleted must be a boolean value'),
    body('roleId').optional().notEmpty().withMessage('Role ID cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required')
    .custom(async (email, { req }) => {
      // Check if email already exists, but ignore the current user's email
      const user = await User.findOne({ email: email });
      if (user && user._id.toString() !== req.user._id) {
        throw new Error('Email already in use');
      }
    }),
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
// Validation rules for user login
const changePasswordValidationRules = () => {
  return [
    body('old_password').notEmpty().isLength({
        min: 8,
        max: 100,
    }).trim().withMessage('Password is required min 8 digit'),
    body('new_password').notEmpty().isLength({
      min: 8,
      max: 100,
  }).trim().withMessage('Password is required min 8 digit'),
  body('new_password').custom((value, { req }) => {
    if (value === req.body.old_password) {
      throw new Error('New password should not be the same as the old password');
    }
    return true;
  }),
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
  validate,
  changePasswordValidationRules,
  updateUserValidationRules
};
