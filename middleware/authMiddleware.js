const jwt = require('jsonwebtoken');
require('dotenv').config();
const apiResponse = require('../helper/apiResponse');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
     token = token.split(' ')[1];

    if (!token) {
        return apiResponse.unauthorizedResponse(res, 'Access denied. No token provided.');
    }

    try {
        console.log(JWT_SECRET_KEY);
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;  // Attach user info to request object
        next();
    } catch (error) {
        console.log(error);
        return apiResponse.unauthorizedResponse(res, 'Invalid or expired token.');
    }
}
module.exports = verifyToken;
