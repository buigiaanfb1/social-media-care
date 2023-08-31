// server/controllers/accessCodeController.js
const jwt = require("jsonwebtoken");

const verifyLoggedIn = async (req, res) => {
  try {
    const decodedToken = jwt.verify(
      req.body.access_token,
      process.env.JWT_SECRET
    );
    if (decodedToken?.phoneNumber == req.body.phoneNumber) {
      // Token is valid, user is logged in
      res.json({
        data: { loggedIn: true, phoneNumber: decodedToken.phoneNumber },
      });
    } else {
      res.status(400).json({ data: { loggedIn: false } });
    }
  } catch (error) {
    // Token is invalid or expired, user is not logged in
    res.status(400).json({ data: { loggedIn: false } });
  }
};

module.exports = { verifyLoggedIn };
