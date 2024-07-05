const jwt = require("jsonwebtoken");
require("dotenv").config();
const apiResponse = require('../helper/apiResponse');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

async function setUser(user) {
  try {
    // Options object
    const options = {};
    // If JWT_EXPIRES is defined, add expiresIn to options
    if (JWT_EXPIRES) {
      options.expiresIn = JWT_EXPIRES;
    }
    const payload = { _id: user._id, email: user.email };
    return jwt.sign(payload, JWT_SECRET_KEY, options);
  } catch (error) {
    console.log(error);
    return null;
  }
}

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if(!token)
    {
      return apiResponse.unauthorizedResponse(res, 'Access denied. No token provided.');
    }
     token = token.split(' ')[1];
    if (!token) {
        return apiResponse.unauthorizedResponse(res, 'Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;  // Attach user info to request object
        next();
    } catch (error) {
        console.log(error);
        return apiResponse.unauthorizedResponse(res, 'Invalid or expired token.');
    }
}

module.exports = {
  setUser,
  verifyToken,
};
