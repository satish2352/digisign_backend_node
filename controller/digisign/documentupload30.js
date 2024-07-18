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
async function handleDocumentUpload30(req, res) {
  const {
    AuthMode,
    aspId,
    ekycId,
    ekycIdType,
    responseSigType,
    responseUrl,
    sc,
    ts,
    txn,
    ver,
    docInfo,
    hashAlgorithm,
    id,
    inputHash,
    canonicalizationAlgorithm,
    signatureAlgorithm,
    referenceUri,
    transformAlgorithm,
    digestAlgorithm,
    digestValue,
    signatureValue,
    x509SubjectName,
    x509Certificate,
  } = req.body;
  const xmlObj = {
    Esign: {
      "@AuthMode": AuthMode,
      "@aspId": aspId,
      "@ekycId": ekycId,
      "@ekycIdType": ekycIdType,
      "@responseSigType": responseSigType,
      "@responseUrl": responseUrl,
      "@sc": sc,
      "@ts": ts,
      "@txn": txn,
      "@ver": ver,
      Docs: {
        InputHash: {
          "@docInfo": docInfo,
          "@hashAlgorithm": hashAlgorithm,
          "@id": id,
          "#": inputHash,
        },
      },
      Signature: {
        "@xmlns": "http://www.w3.org/2000/09/xmldsig#",
        SignedInfo: {
          CanonicalizationMethod: {
            "@Algorithm": canonicalizationAlgorithm,
          },
          SignatureMethod: {
            "@Algorithm": signatureAlgorithm,
          },
          Reference: {
            "@URI": referenceUri,
            Transforms: {
              Transform: {
                "@Algorithm": transformAlgorithm,
              },
            },
            DigestMethod: {
              "@Algorithm": digestAlgorithm,
            },
            DigestValue: digestValue,
          },
        },
        SignatureValue: signatureValue,
        KeyInfo: {
          X509Data: {
            X509SubjectName: x509SubjectName,
            X509Certificate: x509Certificate,
          },
        },
      },
    },
  };

  const xmlData = create(xmlObj).end({ prettyPrint: true });
  res.header("Content-Type", "application/xml");

  request({
    uri: "http://www.giantbomb.com/api/search",
    method: "POST", // Assuming the API expects a POST request
    headers: {
      "Content-Type": "application/xml",
    },
    body: xmlData,
  }).pipe(res);

  res.send(xmlData);
}

module.exports = {
  handleDocumentUpload30
    // getDocumentUploadeForSign
};
