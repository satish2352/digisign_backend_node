const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { connectMongoDb } = require('./connection');

// Connect to MongoDB
connectMongoDb();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);

// Start server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
