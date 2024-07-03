const  User = require('../model/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const apiResponse=require('../helper/apiResponse')
const { setUser } = require('../service/auth');


async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    return apiResponse.successResponseWithData(res,"User list retrived successfully",allDbUsers)
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res,"Error occured during api call")
  }
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return apiResponse.ErrorResponse(res, 'Email and password are required');
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return apiResponse.ErrorResponse(res, 'User not found');
    }

    console.log(`User Password (Hashed): ${user.password}`);
    console.log(`Provided Password: ${password}`);

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password Match: ${isMatch}`);
    if (!isMatch) {
      return apiResponse.ErrorResponse(res, 'Invalid credentials');
    }

    // Generate a JWT token using the authService
    const token = await setUser(user);
    if (!token) {
      return apiResponse.ErrorResponse(res, 'Error generating token');
    }

    // Return success response with the token
    return apiResponse.successResponseWithData(res, 'Login successful', { token });
  } catch (error) {
    console.error(error);
    return apiResponse.ErrorResponse(res, 'Error occurred during API call');
  }
}


async function handleCreateUser(req, res) {
  try {
    // Extract user details from the request body
    const { firstName, lastName, mobile, email, password, roleId, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiResponse.ErrorResponse(res, "User already exists");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      roleId,
      role
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Respond with the created user (excluding password)
    return res.status(201).json({
      result: true,
      data: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        mobile: savedUser.mobile,
        email: savedUser.email,
        roleId: savedUser.roleId,
        role: savedUser.role,
        createdAt: savedUser.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    return apiResponse.ErrorResponse(res, 'Error occurred during API call');
  }
}


module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleLoginUser
};
