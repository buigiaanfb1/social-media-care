// server/routes/accessCodeRoutes.js
const express = require("express");
const router = express.Router();
const { createAccessCode, validateAccessCode } = require("../controllers/otp");

// Create a new access code and send it via Twilio
router.post("/new", createAccessCode);

// Validate a provided access code
router.post("/validate", validateAccessCode);

module.exports = router;
