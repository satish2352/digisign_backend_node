const express = require("express");
const router = express.Router();
const { verifyToken } = require("../service/auth");


/**
 * @swagger
 * /api/digisign/22signature21/:
 *   post:
 *     summary: Get create signature
 *     description: By using this signature can be created.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:

  *               AuthMod:
  *                 type: integer
  *               aspI:
  *                 type: integer
  *               ekycI:
  *                 type: integer
  *               ekycIdTyp:
  *                 type: integer
  *               responseSigTyp:
  *                 type: integer
  *               responseUr:
  *                 type: integer
  *               s:
  *                 type: integer
  *               t:
  *                 type: integer
  *               tx:
  *                 type: integer
  *               ve:
  *                 type: integer
  *               docInf:
  *                 type: integer
  *               hashAlgorith:
  *                 type: integer
  *               i:
  *                 type: integer
  *               inputHas:
  *                 type: integer
  *               canonicalizationAlgorith:
  *                 type: integer
  *               signatureAlgorith:
  *                 type: integer
  *               referenceUr:
  *                 type: integer
  *               transformAlgorith:
  *                 type: integer
  *               digestAlgorith:
  *                 type: integer
  *               digestValu:
  *                 type: integer
  *               signatureValu:
  *                 type: integer
  *               x509SubjectNam:
  *                 type: integer
  *               x509Certificate,:
  *                 type: integer
 *     responses:
 *       200:
 *         description: document xml successfully
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

const { handleCreateSignature } = require("../controller/digisign/apidigisign");
router.post("/22signature21", handleCreateSignature);

//Version 3.0

/**
 * @swagger
 * /api/digisign/documentUpload30/:
 *   post:
 *     summary: Get upload document
 *     description: By using this api document can upload.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:

  *               AuthMod:
  *                 type: integer
  *               aspI:
  *                 type: integer
  *               ekycI:
  *                 type: integer
  *               ekycIdTyp:
  *                 type: integer
  *               responseSigTyp:
  *                 type: integer
  *               responseUr:
  *                 type: integer
  *               s:
  *                 type: integer
  *               t:
  *                 type: integer
  *               tx:
  *                 type: integer
  *               ve:
  *                 type: integer
  *               docInf:
  *                 type: integer
  *               hashAlgorith:
  *                 type: integer
  *               i:
  *                 type: integer
  *               inputHas:
  *                 type: integer
  *               canonicalizationAlgorith:
  *                 type: integer
  *               signatureAlgorith:
  *                 type: integer
  *               referenceUr:
  *                 type: integer
  *               transformAlgorith:
  *                 type: integer
  *               digestAlgorith:
  *                 type: integer
  *               digestValu:
  *                 type: integer
  *               signatureValu:
  *                 type: integer
  *               x509SubjectNam:
  *                 type: integer
  *               x509Certificate,:
  *                 type: integer
 *     responses:
 *       200:
 *         description: document xml successfully
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

const {
  handleDocumentUpload30,
} = require("../controller/digisign/documentupload30");
router.post("/documentUpload30", handleDocumentUpload30);

//Version 3.0

/**
 * @swagger
 * /api/digisign/26updatesingledocumenttosign30/:
 *   post:
 *     summary: Get upload single document
 *     description: By using this api single document can upload.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:

*               documentId:
*                   type: integer
*               info:
*                   type: integer
*               documentURL:
*                   type: integer
*               digest:
*                   type: integer
*               consent:
*                   type: integer
 *     responses:
 *       200:
 *         description: single document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     
 *               
 *       400:
 *         description: Bad request - Requested page exceeds total number of pages
 *       500:
 *         description: Internal server error
 */
const {
  handleUpdateSingleDocument30,
} = require("../controller/digisign/26updatesingledocument30");
router.post("/26updatesingledocumenttosign30", handleUpdateSingleDocument30);

//Version 3.0 Page No 59


/**
 * @swagger
 * /api/digisign/handleUpdateMultipleDocument30/:
 *   post:
 *     summary: Get upload multiple document
 *     description: By using this api multiple  document can upload.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:

*               documentId:
*                   type: integer
*               info:
*                   type: integer
*               documentURL:
*                   type: integer
*               digest:
*                   type: integer
*               consent:
*                   type: integer
 *     responses:
 *       200:
 *         description: single document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     
 *               
 *       400:
 *         description: Bad request - Requested page exceeds total number of pages
 *       500:
 *         description: Internal server error
 */
const {
  handleUpdateMultipleDocument30,
} = require("../controller/digisign/27updatemultipledocument30");
router.post("/26updatemultipledcumenttosign30", handleUpdateMultipleDocument30);

module.exports = router;
