/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         roleId:
 *           type: number
 *         mobile:
 *           type: string
 *         is_deleted:
 *           type: number
 *         isActive:
 *           type: boolean
 *         password:
 *           type: string
 *       example:
 *         firstName: John
 *         email: john.doe@example.com
 *         role: user
 *         isActive: 1
 */

/**
 * @swagger
 * /api/user/:
 *   post:
 *     summary: Get all users with pagination
 *     description: Endpoint to fetch a paginated list of users.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *               pageSize:
 *                 type: integer
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       400:
 *         description: Bad request - Requested page exceeds total number of pages
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Authenticate user and generate JWT token
 *     description: Endpoint to authenticate a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request - Invalid credentials
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               mobile:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request - User already exists with provided email id
 *       500:
 *         description: Internal server error
 */
const express = require('express');
const router = express.Router();
const {verifyToken,checkUserExists,checkUserExistsWithotToken} = require('../service/auth');

const {
    createUserValidationRules,
    loginUserValidationRules,
    validate,
    changePasswordValidationRules,
    updateUserValidationRules
  } = require('../middleware/validators');
const { handleGetAllUsers,
  handleCreateUser,
  handleLoginUser,
  handleChangePassword,
  handleLogout,
  handleDeleteUser,
  handleUpdateUser,
 } = require('../controller/user');

router.post('/create',verifyToken,createUserValidationRules(),validate,handleCreateUser);
router.post('/login',loginUserValidationRules(),validate,checkUserExistsWithotToken,handleLoginUser);
router.post('/',verifyToken,handleGetAllUsers);
router.post('/chnagePassword',verifyToken,changePasswordValidationRules(),validate,checkUserExists,handleChangePassword);
router.post('/logout',verifyToken,checkUserExists,handleLogout);
router.post('/deleteUser',verifyToken,checkUserExists,handleDeleteUser);
router.post('/updateUser',verifyToken,checkUserExists,updateUserValidationRules(),validate,handleUpdateUser);
module.exports = router;
