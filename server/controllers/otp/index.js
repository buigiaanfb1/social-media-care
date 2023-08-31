// server/controllers/accessCodeController.js
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const {
  getUserAccessCode,
  saveUserAccessCode,
  clearUserAccessCode,
} = require("../../services/otp");
// const AccessToken = require("../models/accessToken"); // Your model for storing access codes

// Your Twilio account SID and authentication token
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const createAccessCode = async (req, res) => {
  if (!req.body.phoneNumber) return;
  try {
    const phoneNumber = req.body.phoneNumber.replace(/\s/g, "");

    console.log(phoneNumber);
    // Generate a 6-digit random access code
    const accessCode = Math.floor(100000 + Math.random() * 900000);

    await saveUserAccessCode(phoneNumber, accessCode);
    return res
      .status(200)
      .json({ message: "Access code sent successfully", accessCode });

    // Send the access code via SMS using Twilio
    // client.messages
    //   .create({
    //     body: `Your access code: ${accessCode}`,
    //     to: phoneNumber,
    //     from: twilioPhoneNumber,
    //   })
    //   .then(async () => {
    //     // Store the access code in your database
    //     await saveUserAccessCode(phoneNumber, accessCode);
    //     return res
    //       .status(200)
    //       .json({ message: "Access code sent successfully" });
    //   })
    //   .catch(() => {
    //     return res.status(500).json({ message: "Error sending access code" });
    //   });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending access code" });
  }
};

const validateAccessCode = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    const { accessCode } = await getUserAccessCode(
      phoneNumber.replace(/\s/g, "")
    );

    if (!accessCode || code != accessCode) {
      return res.status(500).json({ message: "Not match" });
    }

    const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET);

    await clearUserAccessCode(phoneNumber, token);

    return res.status(200).json({
      success: true,
      data: {
        access_token: token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error validating access code" });
  }
};

module.exports = { createAccessCode, validateAccessCode };
