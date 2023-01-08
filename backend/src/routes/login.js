const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { getUserData } = require("../util.js");
const { OAuth2Client } = require("google-auth-library");

const authClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" // For some reason, this MUST be "postmessage"
);

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

// Verify login and return jwt token
router.post("/", jsonParser, async (req, res) => {
  const { tokens } = await authClient.getToken(req.body.code);
  res.json(tokens);
});

module.exports = router;
