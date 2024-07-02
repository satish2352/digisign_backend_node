const express = require('express');
const router = express.Router();
const { handleGetAllUsers,handleCreateUser } = require('../controller/user');

router.get('/',handleGetAllUsers);
router.post('/create',handleCreateUser);
module.exports = router;
