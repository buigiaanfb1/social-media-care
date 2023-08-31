// server/routes/accessCodeRoutes.js
const express = require("express");
const router = express.Router();
const validateParams = require("../middleware/validateParams");
const { verifyLoggedIn } = require("../controllers/me");

// Define required parameters for each route
const validateLoggedInRequiredParams = ["phoneNumber", "access_token"];

// Create a new access code and send it via Twilio
router.post(
  "/validate",
  validateParams(validateLoggedInRequiredParams),
  verifyLoggedIn
);

module.exports = router;
