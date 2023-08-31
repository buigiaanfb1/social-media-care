const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const accessCode = require("./routes/accessCode");
const me = require("./routes/me");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      enableProof: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      // Use profile data for user authentication and registration
      // You can store user data in the database
      // Call done() with user data if successful
      console.log("accessToken", accessToken);
      console.log("refreshToken"), refreshToken;
      console.log("profile", profile);
      cb(null, profile);
    }
  )
);

// Authentication route
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    // Generate a JWT token and send it to the client
    const token = jwt.sign({ userId: req.user.userId }, process.env.JWT_SECRET);
    const redirectURL = "http://localhost:3000"; // Replace with your React app's URL
    res.redirect(`${redirectURL}/?token=${token}`);
  }
);

app.post("/facebook/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    var params = {
      client_id: process.env["AUTH0_CLIENT_ID"],
      returnTo: "http://localhost:3000/",
    };
    res.redirect(
      "https://" +
        process.env["AUTH0_DOMAIN"] +
        "/v2/logout?" +
        qs.stringify(params)
    );
  });
});

app.use("/api/access-code", accessCode);
app.use("/api/me", me);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
