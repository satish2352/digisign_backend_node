const User = require("../../model/user");
const Tokens = require("../../model/tokens");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../../helper/apiResponse");
const { setUser } = require("../../service/auth");
require("dotenv").config();
const { create } = require("xmlbuilder2");
var request = require("request");

//Version 3.0
async function handleUpdateSingleDocument30(req, res) {
  const { documentId, info, documentURL, digest, consent } = req.body;
  console.log(req.body);
  const postData = {
     'documentId': documentId,
     'info': info,
     'documentURL': documentURL,
     'digest': digest,
     'consent':consent
  };


 request({
  uri: "https://api.restful-api.dev/objects",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postData),  // Convert the postData object to a JSON string
}, (error, response, body) => {
  if (error) {
    console.error('Request failed:', error);
    res.status(500).send({ error: 'Request failed' });
  } else {
    console.log('Response:', body);
    // res.send(body);
  }
});

  res.send(postData);
}

module.exports = {
    handleUpdateSingleDocument30,
};
