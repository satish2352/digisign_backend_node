const  User = require('../model/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    res.json({result:true, data:allDbUsers});
  } catch (error) {
    console.log(error);
    res.status(500).json({ result:false, error: 'An error occurred while fetching users' });
  }
}

async function handleCreateUser(req, res) {
    try {
      // Extract user details from the request body
      const { firstName, lastName, mobile, email, password, roleId, role } = req.body;
      // Validate required fields
      if (!firstName || !lastName || !mobile || !email || !password || !roleId) {
        return res.status(400).json({result:false, error: "Please provide all required fields" });
      }
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ result:false, error: "Please provide a valid email" });
      }
      // Validate mobile number format (example for 10-digit number)
      if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({result:false,  error: "Enter a valid 10-digit mobile number" });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({result:false, error: "User already registered" });
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
      res.status(201).json({result:true,
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
      res.status(500).json({result:false, error: 'An error occurred while creating user' });
    }
  }

module.exports = {
  handleGetAllUsers,
  handleCreateUser
};
