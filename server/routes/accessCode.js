// server/routes/accessCodeRoutes.js
const express = require("express");
const router = express.Router();
const validateParams = require("../middleware/validateParams");
const { createAccessCode, validateAccessCode } = require("../controllers/otp");

// Define required parameters for each route
const createAccessCodeRequiredParams = ["phoneNumber"];
const validateAccessCodeRequiredParams = ["phoneNumber", "code"];

// Create a new access code and send it via Twilio
router.post(
  "/new",
  validateParams(createAccessCodeRequiredParams),
  createAccessCode
);
// Validate a provided access code
router.post(
  "/validate",
  validateParams(validateAccessCodeRequiredParams),
  validateAccessCode
);

module.exports = router;
