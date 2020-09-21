import fs from "fs";
import path from "path";

export default {
  callbackUrl: process.env.SAML_CALL_BACK_URL,
  entryPoint: process.env.SAML_ENTRY_POINT,
  issuer: process.env.SAML_ENTITY_ID,
  // identifierFormat: null,
  // signatureAlgorithm: "sha512",
  decryptionPvk: fs.readFileSync(
    path.join(
      __dirname,
      "..",
      process.env.KEY_PATH ? process.env.KEY_PATH : ""
    ),
    "utf8"
  ),
  privateCert: fs.readFileSync(
    path.join(
      __dirname,
      "..",
      process.env.CERT_PATH ? process.env.CERT_PATH : ""
    ),
    "utf8"
  ),
  // cert: fs.readFileSync(__dirname + process.env.SHIB_CERT_PATH, "utf8"),
  validateInResponseTo: false,
  disableRequestedAuthnContext: true,
};
