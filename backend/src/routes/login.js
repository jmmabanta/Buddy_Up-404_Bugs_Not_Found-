const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();

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
  res.json(payload);
});

module.exports = router;
