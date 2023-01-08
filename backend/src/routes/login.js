const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://db:27017/users");

const findOrCreate = require("mongoose-findorcreate");
const UserSchema = new mongoose.Schema({
  googleID: String,
  name: String,
  email: String,
  picture: String,
  faculty: String,
  courses: [{ name: String, type: String, section: String }],
});
UserSchema.plugin(findOrCreate);
const User = new mongoose.model("User", UserSchema);

const jsonParser = bodyParser.json();

const authClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" // For some reason, this MUST be "postmessage"
);

// Verify login and return user info
router.post("/", jsonParser, async (req, res) => {
  const { tokens } = await authClient.getToken(req.body.code);
  const ticket = await authClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  User.findOrCreate(
    {
      googleID: payload["sub"],
    },
    {
      name: payload["name"],
      email: payload["email"],
      picture: payload["picture"],
    }
  );
  res.json(payload);
});

module.exports = router;
