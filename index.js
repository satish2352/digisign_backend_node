const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'application/xml' }));

const { connectMongoDb } = require('./connection');
const swaggerSetup = require('./docs/swagger');
const initializeUserRoles = require('./init/initializeUserRoles');

// Connect to MongoDB
connectMongoDb();
swaggerSetup(app);
initializeUserRoles()
  .then(() => {
    console.log('UserRoles collection initialization check complete.');
  })
  .catch((err) => {
    console.error('Error initializing UserRoles collection:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const userRouter = require('./routes/user');
const apiForDigisign = require('./routes/apidigisignnew');


app.use('/api/user', userRouter);
app.use('/api/digisign', apiForDigisign);

// Start server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
