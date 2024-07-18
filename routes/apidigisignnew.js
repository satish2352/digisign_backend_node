const express = require("express");
const router = express.Router();
const { verifyToken } = require("../service/auth");

const { handleCreateSignature } = require("../controller/digisign/apidigisign");
router.post("/22signature21", handleCreateSignature);

//Version 3.0
const {
  handleDocumentUpload30,
} = require("../controller/digisign/documentupload30");
router.post("/documentUpload30", handleDocumentUpload30);

//Version 3.0
const {
  handleUpdateSingleDocument30,
} = require("../controller/digisign/26updatesingledocument30");
router.post("/26updatesingledocumenttosign30", handleUpdateSingleDocument30);

//Version 3.0 Page No 59
const {
  handleUpdateMultipleDocument30,
} = require("../controller/digisign/27updatemultipledocument30");
router.post("/26updatemultipledcumenttosign30", handleUpdateMultipleDocument30);

module.exports = router;
