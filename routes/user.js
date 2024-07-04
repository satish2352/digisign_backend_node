const express = require('express');
const router = express.Router();
const {verifyToken} = require('../service/auth');

const {
    createUserValidationRules,
    loginUserValidationRules,
    validate
  } = require('../middleware/validators');
const { handleGetAllUsers,handleCreateUser,handleLoginUser } = require('../controller/user');

router.post('/create',createUserValidationRules(),validate,handleCreateUser);
router.post('/login',loginUserValidationRules(),validate,handleLoginUser);
router.post('/',verifyToken,handleGetAllUsers);
module.exports = router;
