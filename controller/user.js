const  User = require('../model/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const apiResponse=require('../helper/apiResponse')

async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    return apiResponse.successResponseWithData(res,"User list retrived successfully",allDbUsers)
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res,"Error occured during api call")
  }
}

async function handleCreateUser(req, res) {
    try {
      // Extract user details from the request body
      const { firstName, lastName, mobile, email, password, roleId, role } = req.body;
      // Validate required fields
      if (!firstName || !lastName || !mobile || !email || !password || !roleId) {
        return apiResponse.ErrorResponse(res,"All Fields are required");
      }
      // Validate email format
      if (!validator.isEmail(email)) {
        return apiResponse.ErrorResponse(res,"Valid email is required");
      }
      // Validate mobile number format (example for 10-digit number)
      if (!/^\d{10}$/.test(mobile)) {
        return apiResponse.ErrorResponse(res,"Enter valid mobile number");
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return apiResponse.ErrorResponse(res,"User already exists");
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
      return res.status(201).json({result:true,
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
      return apiResponse.ErrorResponse(res,'Error occured during api call');
      
      
    }
  }

module.exports = {
  handleGetAllUsers,
  handleCreateUser
};
